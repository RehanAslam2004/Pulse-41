import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    type: string
    id: string
  }>
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { type, id } = await params
    const body = await request.json()
    const supabase = createAdminClient()

    if (type === 'contacts') {
      const { status } = body
      if (!status) {
        return NextResponse.json({ error: 'Status is required.' }, { status: 400 })
      }
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    if (type === 'quotes') {
      const { status } = body
      if (!status) {
        return NextResponse.json({ error: 'Status is required.' }, { status: 400 })
      }
      const { data, error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    if (type === 'newsletters') {
      const { is_active } = body
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .update({
          is_active: Boolean(is_active),
          unsubscribed_at: is_active ? null : new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    if (type === 'applications') {
      const { status } = body
      if (!status) {
        return NextResponse.json({ error: 'Status is required.' }, { status: 400 })
      }
      const { data, error } = await supabase
        .from('job_applications')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    return NextResponse.json({ error: `Unsupported lead type: ${type}` }, { status: 400 })
  } catch (err: any) {
    console.error('Failed to update lead:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to update lead status' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { type, id } = await params
    const supabase = createAdminClient()

    let tableName: 'contact_submissions' | 'quote_requests' | 'newsletter_subscriptions' | 'job_applications'
    if (type === 'contacts') tableName = 'contact_submissions'
    else if (type === 'quotes') tableName = 'quote_requests'
    else if (type === 'newsletters') tableName = 'newsletter_subscriptions'
    else if (type === 'applications') tableName = 'job_applications'
    else return NextResponse.json({ error: `Unsupported lead type: ${type}` }, { status: 400 })

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true, message: 'Lead deleted successfully' })
  } catch (err: any) {
    console.error('Failed to delete lead:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
