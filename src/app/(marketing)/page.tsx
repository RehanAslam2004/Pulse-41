import type { Metadata } from 'next'
import { HomePageClient } from '@/components/pages/HomePageClient'
import { getIndustries, getBlogPosts, getCaseStudies } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Pulse41 — Tech. Think. Thrive.',
  description:
    'Pulse41 builds AI-powered products, digital experiences and technology solutions for organizations ready to move from complexity to measurable progress.',
  openGraph: {
    title: 'Pulse41 — Tech. Think. Thrive.',
    description:
      'AI-powered products, digital experiences and technology solutions that help organizations move from complexity to measurable progress.',
    url: 'https://pulse41.com',
  },
}

export default async function HomePage() {
  const [industries, blogPosts, caseStudies] = await Promise.all([
    getIndustries(),
    getBlogPosts(),
    getCaseStudies(),
  ])

  return (
    <HomePageClient
      industriesData={industries}
      blogPostsData={blogPosts}
      caseStudyData={caseStudies[0]}
    />
  )
}
