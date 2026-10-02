import type { Metadata } from 'next'
import { PricingPageClient } from '@/components/pages/PricingPageClient'

export const metadata: Metadata = {
  title: 'Pricing & Engagement Models',
  description:
    'Transparent, milestone-based commercial structures: fixed-scope projects, dedicated teams, managed services, and offshore development centers.',
  openGraph: {
    title: 'Pricing & Engagement Models | Pulse41',
    description:
      'Explore flexible commercial models and delivery tiers engineered to fit your technical scope and organizational timeline.',
  },
}

export default function PricingPage() {
  return <PricingPageClient />
}
