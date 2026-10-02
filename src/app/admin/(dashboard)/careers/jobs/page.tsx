import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { OpenPositionsClient } from '@/components/admin/careers/OpenPositionsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Open Positions · Pulse41 Control',
}

export default async function AdminCareersJobsPage() {
  const supabase = createAdminClient()
  const { data: jobs } = await supabase
    .from('job_listings')
    .select('*')
    .order('sort_order', { ascending: true })

  return <OpenPositionsClient initialJobs={jobs || []} />
}
