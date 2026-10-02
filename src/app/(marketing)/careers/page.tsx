import type { Metadata } from 'next'
import { CareersPageClient } from '@/components/pages/CareersPageClient'
import { getJobListings } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Careers & Engineering Culture',
  description:
    'Join Pulse41 — work on mission-critical software engineering, applied AI, and global platform deliveries from Pakistan with remote-first collaboration.',
  openGraph: {
    title: 'Careers & Engineering Culture | Pulse41',
    description:
      'Explore career opportunities in full-stack software, applied machine learning, cloud platforms, and product design.',
  },
}

export default async function CareersPage() {
  const jobs = await getJobListings()
  return <CareersPageClient jobListings={jobs} />
}
