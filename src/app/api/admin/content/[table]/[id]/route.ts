import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    table: string
    id: string
  }>
}

const ALLOWED_TABLES = ['case_studies', 'blog_posts', 'job_listings'] as const
type AllowedTable = (typeof ALLOWED_TABLES)[number]

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { table, id } = await params

    if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
      return NextResponse.json({ error: `Invalid content table: ${table}` }, { status: 400 })
    }

    const body = await request.json()
    const supabase = createAdminClient()

    // Disallow overriding the immutable id
    delete body.id

    const { data, error } = await (supabase
      .from(table as any)
      .update(body as any)
      .eq('id', id)
      .select()
      .single() as any)

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Failed to update content item:', err)
    return NextResponse.json({ error: err.message || 'Failed to update content item' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { table, id } = await params

    if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
      return NextResponse.json({ error: `Invalid content table: ${table}` }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase
      .from(table as AllowedTable)
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Content item deleted successfully.' })
  } catch (err: any) {
    console.error('Failed to delete content item:', err)
    return NextResponse.json({ error: err.message || 'Failed to delete content item' }, { status: 500 })
  }
}
