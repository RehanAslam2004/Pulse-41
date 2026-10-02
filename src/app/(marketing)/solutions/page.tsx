import type { Metadata } from 'next'
import { SolutionsPageClient } from '@/components/pages/SolutionsPageClient'
import { getSolutions } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Configurable Productized Solutions',
  description:
    'Explore Pulse41 ten productized solution platforms: AI Customer Experience, Omnichannel Contact Centre, Enterprise Operations, Intelligent Automation and more.',
  openGraph: {
    title: 'Configurable Productized Solutions | Pulse41',
    description:
      'Proven enterprise technology platforms configurable for modern organizations seeking accelerated delivery and reliable scale.',
  },
}

export default async function SolutionsPage() {
  const solutions = await getSolutions()
  return <SolutionsPageClient solutionsData={solutions} />
}
