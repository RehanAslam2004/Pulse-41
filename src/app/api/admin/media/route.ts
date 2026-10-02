import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '100', 10)

    const supabase = createAdminClient()
    let query = supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (search && search.trim()) {
      query = query.ilike('file_name', `%${search.trim()}%`)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ assets: data || [] })
  } catch (err: any) {
    console.error('Media fetch error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const customCategory = formData.get('category') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Determine category
    let category = customCategory || 'images'
    const mimeType = file.type || 'application/octet-stream'
    if (!customCategory) {
      if (mimeType.startsWith('image/')) {
        category = 'images'
      } else if (mimeType.startsWith('video/')) {
        category = 'videos'
      } else if (
        mimeType.includes('pdf') ||
        mimeType.includes('word') ||
        mimeType.includes('document') ||
        mimeType.includes('text')
      ) {
        category = 'documents'
      } else if (mimeType.includes('svg') || file.name.endsWith('.svg')) {
        category = 'brand_assets'
      }
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'bin'
    const sanitizedBase = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 60)
    const storagePath = `${category}/${Date.now()}-${sanitizedBase}.${fileExt}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage bucket pulse41-media
    const { error: uploadError } = await supabase.storage
      .from('pulse41-media')
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError)
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    const { data: urlData } = supabase.storage
      .from('pulse41-media')
      .getPublicUrl(storagePath)

    const publicUrl = urlData.publicUrl

    // Insert into media_assets table
    const { data: assetData, error: dbError } = await supabase
      .from('media_assets')
      .insert({
        file_name: file.name,
        file_url: publicUrl,
        file_size: file.size,
        mime_type: mimeType,
        category: category,
        uploaded_by: 'admin@pulse41.com',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database asset registration error:', dbError)
      return NextResponse.json(
        { error: `Database insert failed: ${dbError.message}` },
        { status: 500 }
      )
    }

    // Log Activity
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'CREATE',
      entity_type: 'media',
      entity_id: assetData.id,
      details: {
        file_name: file.name,
        file_url: publicUrl,
        file_size: file.size,
        category,
        storage_path: storagePath,
      },
    })

    return NextResponse.json({ success: true, asset: assetData })
  } catch (err: any) {
    console.error('Media upload handler error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Asset ID is required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // 1. Fetch asset to get URL/filename
    const { data: asset, error: fetchErr } = await supabase
      .from('media_assets')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchErr || !asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    // 2. Try to remove file from storage if URL matches public bucket path
    try {
      const urlParts = asset.file_url.split('/pulse41-media/')
      if (urlParts.length > 1) {
        const filePath = decodeURIComponent(urlParts[1])
        await supabase.storage.from('pulse41-media').remove([filePath])
      }
    } catch (storageErr) {
      console.warn('Storage file deletion warning (continuing DB removal):', storageErr)
    }

    // 3. Remove from media_assets table
    const { error: deleteErr } = await supabase
      .from('media_assets')
      .delete()
      .eq('id', id)

    if (deleteErr) throw deleteErr

    // 4. Log Activity
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'DELETE',
      entity_type: 'media',
      entity_id: id,
      details: {
        file_name: asset.file_name,
        category: asset.category,
      },
    })

    return NextResponse.json({ success: true, deletedId: id })
  } catch (err: any) {
    console.error('Media delete error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
