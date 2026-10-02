import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { AdminUsersClient } from '@/components/admin/system/AdminUsersClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Users · Pulse41 Control',
}

export default async function AdminUsersPage() {
  const supabase = createAdminClient()

  const { data: users } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminUsersClient initialUsers={users || []} />
}
