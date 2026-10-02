import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getIndustryBySlug,
  getIndustries,
  getSolutions,
  getAllIndustrySlugs,
} from '@/lib/supabase/queries'
import { IndustryDetailPageClient } from '@/components/pages/IndustryDetailPageClient'

interface IndustryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllIndustrySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = await getIndustryBySlug(slug)

  if (!industry) {
    return {
      title: 'Industry Domain Not Found | Pulse41',
    }
  }

  return {
    title: `${industry.name} | Industry Solutions | Pulse41`,
    description: industry.tagline || industry.description,
    openGraph: {
      title: `${industry.name} | Pulse41 Sector Blueprint`,
      description: industry.tagline || industry.description,
      type: 'website',
      url: `https://pulse41.com/industries/${industry.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.name} | Pulse41`,
      description: industry.tagline || industry.description,
    },
  }
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params
  const industry = await getIndustryBySlug(slug)

  if (!industry) {
    notFound()
  }

  const [allIndustries, solutions] = await Promise.all([
    getIndustries(),
    getSolutions(),
  ])

  return (
    <IndustryDetailPageClient
      industry={industry}
      allIndustries={allIndustries}
      solutions={solutions}
    />
  )
}
