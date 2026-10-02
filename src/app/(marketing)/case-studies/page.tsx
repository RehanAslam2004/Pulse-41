import type { Metadata } from 'next'
import { CaseStudiesPageClient } from '@/components/pages/CaseStudiesPageClient'
import { getCaseStudies } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Case Studies & Delivery Blueprints',
  description:
    'Explore Pulse41 delivery blueprints and engineering engagements across eCommerce, FinTech, EdTech, Healthcare, and Enterprise Platforms.',
  openGraph: {
    title: 'Case Studies & Delivery Blueprints | Pulse41',
    description:
      'Explore how software engineering, practical AI, and UX design converge to solve mission-critical operational challenges.',
  },
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()
  return <CaseStudiesPageClient caseStudies={caseStudies} />
}
