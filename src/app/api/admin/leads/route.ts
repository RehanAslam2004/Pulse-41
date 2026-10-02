import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Run parallel queries across all CRM-related collections
    const [contactsRes, quotesRes, newslettersRes, orgsRes, contactsDirectoryRes] = await Promise.all([
      supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false }),
      supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('contacts')
        .select('*, organizations(name, industry)')
        .order('created_at', { ascending: false }),
    ])

    if (contactsRes.error) throw contactsRes.error
    if (quotesRes.error) throw quotesRes.error
    if (newslettersRes.error) throw newslettersRes.error

    const contacts = contactsRes.data || []
    const quotes = quotesRes.data || []
    const newsletters = newslettersRes.data || []
    const organizations = orgsRes.data || []
    const directoryContacts = contactsDirectoryRes.data || []

    const newContactsCount = contacts.filter((c) => c.status === 'new').length
    const newQuotesCount = quotes.filter((q) => q.status === 'new').length
    const activeSubscribersCount = newsletters.filter((n) => n.is_active).length

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        quotes,
        newsletters,
        organizations,
        directoryContacts,
      },
      counts: {
        totalLeads: contacts.length + quotes.length,
        totalContacts: contacts.length,
        newContacts: newContactsCount,
        totalQuotes: quotes.length,
        newQuotes: newQuotesCount,
        totalOrganizations: organizations.length,
        totalDirectoryContacts: directoryContacts.length,
        totalSubscribers: newsletters.length,
        activeSubscribers: activeSubscribersCount,
      },
    })
  } catch (err: any) {
    console.error('Failed to fetch admin leads:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to fetch leads from database' },
      { status: 500 }
    )
  }
}

// Update lead or quote status / notes
export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { id, type, status, notes } = body

    if (!id || !type || !status) {
      return NextResponse.json({ error: 'Missing id, type, or status' }, { status: 400 })
    }

    const table = type === 'quote' ? 'quote_requests' : 'contact_submissions'
    const updatePayload: any = { status }

    const { data, error } = await supabase
      .from(table)
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Log the status change in the immutable audit log
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'STATUS_CHANGE',
      entity_type: type === 'quote' ? 'quote' : 'lead',
      entity_id: id,
      details: { newStatus: status, entityName: data?.name || data?.company || id },
    })

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Failed to update lead status:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Manual Lead Creation OR 1-Click Promote Lead to Organization & Contact
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    // 1. Manual Lead Creation branch
    if (body.action === 'create' || body.isManualCreate) {
      const { name, email, company, project_type, budget, message, status = 'new' } = body

      if (!name || !email) {
        return NextResponse.json(
          { error: 'Name and Email are required to create a lead.' },
          { status: 400 }
        )
      }

      const { data: newLead, error: insertError } = await supabase
        .from('contact_submissions')
        .insert({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company?.trim() || null,
          project_type: project_type || 'Digital Transformation Consulting',
          budget: budget || 'Custom / Undisclosed',
          message: message?.trim() || 'Manual lead entry from admin control.',
          status: status || 'new',
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Record Audit Log
      await supabase.from('admin_activity_logs').insert({
        admin_email: 'admin@pulse41.com',
        action: 'CREATE',
        entity_type: 'lead',
        entity_id: newLead.id,
        details: {
          name: newLead.name,
          email: newLead.email,
          company: newLead.company,
          status: newLead.status,
          source: 'Manual Entry',
        },
      })

      // Create Admin Notification
      await supabase.from('admin_notifications').insert({
        title: 'New Lead Added',
        message: `Admin created lead for ${newLead.name} (${newLead.company || 'Direct'})`,
        type: 'lead',
        link: '/admin/leads',
      })

      return NextResponse.json({
        success: true,
        data: newLead,
        message: 'Lead created successfully.',
      })
    }

    // 2. Promotion branch
    const { leadId, type, companyName, contactName, email, phone, jobTitle, industry, notes } = body

    if (!companyName || !contactName || !email) {
      return NextResponse.json(
        { error: 'Company Name, Contact Name, and Email are required to promote lead.' },
        { status: 400 }
      )
    }

    // 1. Create or Find Organization
    const { data: existingOrg } = await supabase
      .from('organizations')
      .select('id, name')
      .ilike('name', companyName.trim())
      .maybeSingle()

    let orgId = existingOrg?.id

    if (!orgId) {
      const { data: newOrg, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: companyName.trim(),
          industry: industry || 'Technology & Growth',
          tier: 'Standard',
          status: 'prospect',
          notes: notes || `Promoted from inbound inquiry (${leadId || 'Direct'})`,
        })
        .select()
        .single()

      if (orgError) throw orgError
      orgId = newOrg.id
    }

    // 2. Create Contact linked to Organization
    const { data: newContact, error: contactError } = await supabase
      .from('contacts')
      .insert({
        organization_id: orgId,
        name: contactName.trim(),
        email: email.trim(),
        phone: phone || null,
        job_title: jobTitle || 'Lead Contact',
        source: type === 'quote' ? 'Quote Request' : 'Inbound Lead',
        status: 'active',
      })
      .select()
      .single()

    if (contactError) throw contactError

    // 3. Update the original lead status to 'qualified'
    if (leadId && type) {
      const table = type === 'quote' ? 'quote_requests' : 'contact_submissions'
      await supabase
        .from(table)
        .update({ status: 'qualified' })
        .eq('id', leadId)
    }

    // 4. Record Audit Log
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'CONVERT_LEAD',
      entity_type: 'organization',
      entity_id: orgId,
      details: {
        organizationName: companyName,
        contactName,
        email,
        originalLeadId: leadId,
      },
    })

    return NextResponse.json({
      success: true,
      organizationId: orgId,
      contactId: newContact.id,
      message: `Lead successfully promoted to Organization "${companyName}" and Contact "${contactName}".`,
    })
  } catch (err: any) {
    console.error('Promotion error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
