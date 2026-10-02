import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { MediaLibraryClient } from '@/components/admin/media/MediaLibraryClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Media Library · Pulse41 Control',
}

export default async function AdminMediaPage() {
  const supabase = createAdminClient()

  const { data: assets } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <MediaLibraryClient
      initialAssets={assets || []}
      initialCategory="all"
    />
  )
}
