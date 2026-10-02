import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const entityId = searchParams.get('id')

    if (!entityId) {
      return NextResponse.json({ error: 'Missing entity id' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data: revisions, error } = await supabase
      .from('content_revisions')
      .select('*')
      .eq('entity_id', entityId)
      .order('version_number', { ascending: false })

    if (error) throw error

    return NextResponse.json({ revisions: revisions || [] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Restore a revision
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { revisionId } = body

    if (!revisionId) {
      return NextResponse.json({ error: 'Missing revisionId' }, { status: 400 })
    }

    const { data: rev, error: revErr } = await supabase
      .from('content_revisions')
      .select('*')
      .eq('id', revisionId)
      .single()

    if (revErr || !rev) throw new Error('Revision not found')

    const snapshot = rev.snapshot as any
    const table = rev.entity_type
    const id = rev.entity_id

    // Update main table with the snapshot
    const { data: updated, error: updateErr } = await (supabase
      .from(table as any)
      .update(snapshot)
      .eq('id', id)
      .select()
      .single() as any)

    if (updateErr) throw updateErr

    // Log the rollback in audit logs
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'UPDATE',
      entity_type: table,
      entity_id: id,
      details: { restoredFromVersion: rev.version_number },
    })

    return NextResponse.json({ success: true, data: updated, message: `Restored version ${rev.version_number}` })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
