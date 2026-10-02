import type { Metadata } from 'next'
import { IndustriesPageClient } from '@/components/pages/IndustriesPageClient'
import { getIndustries } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Industry Solutions & Domains',
  description:
    'Domain-specific software engineering and applied AI for Financial Services, Healthcare, Public Sector, Education, Retail, Media, Logistics and more.',
  openGraph: {
    title: 'Industry Solutions & Domains | Pulse41',
    description:
      'Pulse41 engineers software and AI solutions tailored to the compliance, regulatory and workflow realities of 12 global industry sectors.',
  },
}

export default async function IndustriesPage() {
  const industries = await getIndustries()
  return <IndustriesPageClient industriesData={industries} />
}
