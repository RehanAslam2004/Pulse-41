import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const supabase = createAdminClient()

    const { status } = body
    if (!status) {
      return NextResponse.json({ error: 'Status is required.' }, { status: 400 })
    }

    const validStatuses = ['new', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
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
  } catch (err: any) {
    console.error('Failed to update job application status:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to update job application status' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Job application deleted successfully' })
  } catch (err: any) {
    console.error('Failed to delete job application:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to delete job application' },
      { status: 500 }
    )
  }
}
