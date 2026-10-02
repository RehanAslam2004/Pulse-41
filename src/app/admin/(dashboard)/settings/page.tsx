import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { SettingsClient } from '@/components/admin/system/SettingsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Settings · Pulse41 Control',
}

export default async function AdminSettingsPage() {
  const supabase = createAdminClient()

  const { data } = await supabase.from('site_settings').select('*')

  const settingsMap: Record<string, any> = {}
  data?.forEach((row) => {
    settingsMap[row.key] = row.value
  })

  return <SettingsClient initialSettings={settingsMap} />
}
