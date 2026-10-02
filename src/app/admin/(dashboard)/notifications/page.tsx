import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { NotificationsPageClient } from '@/components/admin/shell/NotificationsPageClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Notification Center · Pulse41 Control',
}

export default async function AdminNotificationsPage() {
  const supabase = createAdminClient()

  const { data: notifications } = await supabase
    .from('admin_notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <NotificationsPageClient
      initialNotifications={notifications || []}
    />
  )
}
