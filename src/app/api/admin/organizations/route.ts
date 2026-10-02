import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data: orgs, error } = await supabase
      .from('organizations')
      .select('*, contacts(id, name, email, job_title)')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ organizations: orgs || [] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { name, industry, website, country, tier, status, notes } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Organization name is required.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('organizations')
      .insert({
        name: name.trim(),
        industry: industry || 'Technology & Growth',
        website: website || null,
        country: country || 'International',
        tier: tier || 'Standard',
        status: status || 'prospect',
        notes: notes || null,
      })
      .select()
      .single()

    if (error) throw error

    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'CREATE',
      entity_type: 'organization',
      entity_id: data.id,
      details: { organizationName: data.name },
    })

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { id, status, tier, industry, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Organization ID is required.' }, { status: 400 })
    }

    const updates: any = {}
    if (status !== undefined) updates.status = status
    if (tier !== undefined) updates.tier = tier
    if (industry !== undefined) updates.industry = industry
    if (notes !== undefined) updates.notes = notes

    const { data, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'UPDATE',
      entity_type: 'organization',
      entity_id: id,
      details: { updates },
    })

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
