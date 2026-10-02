import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getSolutionBySlug,
  getSolutions,
  getIndustries,
  getAllSolutionSlugs,
} from '@/lib/supabase/queries'
import { SolutionDetailPageClient } from '@/components/pages/SolutionDetailPageClient'

interface SolutionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSolutionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)

  if (!solution) {
    return {
      title: 'Solution Not Found | Pulse41',
    }
  }

  return {
    title: `${solution.productName} — ${solution.title} | Pulse41 Solutions`,
    description: solution.tagline || solution.description,
    openGraph: {
      title: `${solution.productName} | Pulse41 Solution Platform`,
      description: solution.tagline || solution.description,
      type: 'website',
      url: `https://pulse41.com/solutions/${solution.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${solution.productName} | Pulse41`,
      description: solution.tagline || solution.description,
    },
  }
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)

  if (!solution) {
    notFound()
  }

  const [allSolutions, industries] = await Promise.all([
    getSolutions(),
    getIndustries(),
  ])

  return (
    <SolutionDetailPageClient
      solution={solution}
      allSolutions={allSolutions}
      industries={industries}
    />
  )
}
