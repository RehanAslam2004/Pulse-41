import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: applications, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    const list = applications || []
    const newCount = list.filter((a) => a.status === 'new').length

    return NextResponse.json({
      success: true,
      data: list,
      counts: {
        total: list.length,
        new: newCount,
      },
    })
  } catch (err: any) {
    console.error('Failed to fetch job applications:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to fetch job applications' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing application id or status' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'STATUS_CHANGE',
      entity_type: 'application',
      entity_id: id,
      details: { newStatus: status, candidate: data.name, job: data.job_title },
    })

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Failed to update application status:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
