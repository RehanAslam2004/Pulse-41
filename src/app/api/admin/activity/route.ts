import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get('entity')
    const action = searchParams.get('action')
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    const supabase = createAdminClient()
    let query = supabase
      .from('admin_activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (entityType && entityType !== 'all') {
      query = query.eq('entity_type', entityType)
    }
    if (action && action !== 'all') {
      query = query.eq('action', action)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ logs: data || [] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { action, entity_type, entity_id, details } = body

    if (!action || !entity_type) {
      return NextResponse.json({ error: 'Action and entity_type are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('admin_activity_logs')
      .insert({
        admin_email: 'admin@pulse41.com',
        action,
        entity_type,
        entity_id: entity_id || null,
        details: details || {},
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
