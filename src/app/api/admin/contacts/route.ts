import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*, organizations(id, name, industry, status)')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ contacts: contacts || [] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { organization_id, name, email, phone, job_title, source, status } = body

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        organization_id: organization_id || null,
        name: name.trim(),
        email: email.trim(),
        phone: phone || null,
        job_title: job_title || null,
        source: source || 'Direct',
        status: status || 'active',
      })
      .select()
      .single()

    if (error) throw error

    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'CREATE',
      entity_type: 'contact',
      entity_id: data.id,
      details: { contactName: data.name, email: data.email },
    })

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
