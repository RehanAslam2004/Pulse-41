import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { AuditLogClient } from '@/components/admin/system/AuditLogClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Audit Trail · Pulse41 Control',
}

export default async function AdminActivityPage() {
  const supabase = createAdminClient()

  const { data: logs } = await supabase
    .from('admin_activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return <AuditLogClient initialLogs={logs || []} />
}
