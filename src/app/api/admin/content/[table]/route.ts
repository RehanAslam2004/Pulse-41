import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    table: string
  }>
}

const ALLOWED_TABLES = [
  'case_studies',
  'blog_posts',
  'job_listings',
  'services',
  'solutions',
  'industries',
  'testimonials',
] as const

type AllowedTable = (typeof ALLOWED_TABLES)[number]

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { table } = await params

    if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
      return NextResponse.json({ error: `Invalid content table: ${table}` }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from(table as AllowedTable)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data: data || [] })
  } catch (err: any) {
    console.error(`Failed to fetch content from table:`, err)
    return NextResponse.json({ error: err.message || 'Failed to fetch content' }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { table } = await params

    if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
      return NextResponse.json({ error: `Invalid content table: ${table}` }, { status: 400 })
    }

    const body = await request.json()
    const supabase = createAdminClient()

    // Auto-generate slug from title/name if missing
    if (table !== 'job_listings' && table !== 'testimonials') {
      const titleProp = body.title || body.name || body.product_name
      if (!body.slug && titleProp) {
        body.slug = titleProp
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      }
    }

    const { data, error } = await (supabase
      .from(table as any)
      .insert(body as any)
      .select()
      .single() as any)

    if (error) throw error

    // Create initial revision snapshot
    if (data?.id) {
      await supabase.from('content_revisions').insert({
        entity_type: table,
        entity_id: data.id,
        version_number: 1,
        snapshot: data,
        author_email: 'admin@pulse41.com',
        summary: 'Initial draft created in Pulse41 Control CMS',
      })
    }

    // Log in Audit Trail
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'CREATE',
      entity_type: table,
      entity_id: data.id,
      details: { title: data.title || data.name || data.slug },
    })

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (err: any) {
    console.error(`Failed to create content item:`, err)
    return NextResponse.json({ error: err.message || 'Failed to create content item' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { table } = await params

    if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
      return NextResponse.json({ error: `Invalid content table: ${table}` }, { status: 400 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing content record ID' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Get current record to calculate version number
    const { data: currentRecord } = await supabase
      .from(table as any)
      .select('*')
      .eq('id', id)
      .single()

    const { data, error } = await (supabase
      .from(table as any)
      .update(updates as any)
      .eq('id', id)
      .select()
      .single() as any)

    if (error) throw error

    // Record revision
    const { count: revCount } = await supabase
      .from('content_revisions')
      .select('*', { count: 'exact', head: true })
      .eq('entity_id', id)

    const nextVersion = (revCount || 0) + 1

    await supabase.from('content_revisions').insert({
      entity_type: table,
      entity_id: id,
      version_number: nextVersion,
      snapshot: data,
      author_email: 'admin@pulse41.com',
      summary: updates.is_published !== undefined
        ? (updates.is_published ? 'Published live' : 'Unpublished to draft')
        : 'Content updated via CMS editor',
    })

    // Log audit trail
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: updates.is_published ? 'PUBLISH' : 'UPDATE',
      entity_type: table,
      entity_id: id,
      details: {
        title: data.title || data.name || data.slug,
        version: nextVersion,
        changes: Object.keys(updates),
      },
    })

    return NextResponse.json({ success: true, data, version: nextVersion })
  } catch (err: any) {
    console.error(`Failed to update content item:`, err)
    return NextResponse.json({ error: err.message || 'Failed to update content item' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { table } = await params
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing content ID parameter' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase
      .from(table as any)
      .delete()
      .eq('id', id)

    if (error) throw error

    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'DELETE',
      entity_type: table,
      entity_id: id,
      details: { deletedAt: new Date().toISOString() },
    })

    return NextResponse.json({ success: true, message: 'Item deleted' })
  } catch (err: any) {
    console.error('Failed to delete content:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
