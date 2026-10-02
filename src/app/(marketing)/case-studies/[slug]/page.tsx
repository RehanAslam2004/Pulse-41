import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getCaseStudyBySlug,
  getCaseStudies,
  getAllCaseStudySlugs,
} from '@/lib/supabase/queries'
import { CaseStudyDetailPageClient } from '@/components/pages/CaseStudyDetailPageClient'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Pulse41',
    }
  }

  return {
    title: `${caseStudy.title} | Case Studies | Pulse41`,
    description: caseStudy.challenge || caseStudy.result,
    openGraph: {
      title: `${caseStudy.title} | Pulse41 Delivery Blueprint`,
      description: caseStudy.challenge || caseStudy.result,
      type: 'article',
      url: `https://pulse41.com/case-studies/${caseStudy.slug}`,
      images: caseStudy.coverImageUrl ? [{ url: caseStudy.coverImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} | Pulse41`,
      description: caseStudy.challenge || caseStudy.result,
      images: caseStudy.coverImageUrl ? [caseStudy.coverImageUrl] : undefined,
    },
  }
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const allCaseStudies = await getCaseStudies()

  return (
    <CaseStudyDetailPageClient
      caseStudy={caseStudy}
      allCaseStudies={allCaseStudies}
    />
  )
}
