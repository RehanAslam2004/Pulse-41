import type { Metadata } from 'next'
import { InsightsPageClient } from '@/components/pages/InsightsPageClient'
import { getBlogPosts } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Insights, Research & Perspectives',
  description:
    'Engineering perspectives, applied AI research, and architecture blueprints from the Pulse41 technical delivery team.',
  openGraph: {
    title: 'Insights, Research & Perspectives | Pulse41',
    description:
      'Explore practical articles and research on enterprise AI, platform modernization, and digital growth.',
  },
}

export default async function InsightsPage() {
  const posts = await getBlogPosts()
  return <InsightsPageClient blogPosts={posts} />
}
