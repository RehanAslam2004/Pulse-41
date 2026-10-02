import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { ApplicationsTrackerClient } from '@/components/admin/careers/ApplicationsTrackerClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Candidate Applications · Pulse41 Control',
}

export default async function AdminCareersApplicationsPage() {
  const supabase = createAdminClient()
  const { data: apps } = await supabase
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false })

  return <ApplicationsTrackerClient initialApplications={apps || []} />
}
