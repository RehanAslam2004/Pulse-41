import type { Metadata } from 'next'
import { AISolutionsPageClient } from '@/components/pages/AISolutionsPageClient'

export const metadata: Metadata = {
  title: 'AI & Intelligent Automation Solutions',
  description:
    'Practical, enterprise-grade AI solutions: generative AI, intelligent RPA, conversational agents, document intelligence, and predictive executive analytics.',
  openGraph: {
    title: 'AI & Intelligent Automation Solutions | Pulse41',
    description:
      'Engineered AI systems that remove operational bottlenecks, synthesize unstructured data, and power intelligent decision-making.',
  },
}

export default function AISolutionsPage() {
  return <AISolutionsPageClient />
}
