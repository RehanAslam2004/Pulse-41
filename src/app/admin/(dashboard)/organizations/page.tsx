import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { OrganizationsClient } from '@/components/admin/crm/OrganizationsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Organizations & Accounts · Pulse41 Control',
}

export default async function AdminOrganizationsPage() {
  const supabase = createAdminClient()
  const { data: orgs } = await supabase
    .from('organizations')
    .select('*, contacts(id, name, email, job_title)')
    .order('created_at', { ascending: false })

  return <OrganizationsClient initialOrganizations={orgs || []} />
}
