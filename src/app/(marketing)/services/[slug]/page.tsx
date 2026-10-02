import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getServiceBySlug,
  getServices,
  getSolutions,
  getAllServiceSlugs,
} from '@/lib/supabase/queries'
import { ServiceDetailPageClient } from '@/components/pages/ServiceDetailPageClient'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Practice Not Found | Pulse41',
    }
  }

  return {
    title: `${service.title} | Enterprise Services | Pulse41`,
    description: service.tagline || service.description,
    openGraph: {
      title: `${service.title} | Pulse41 Practice Blueprint`,
      description: service.tagline || service.description,
      type: 'website',
      url: `https://pulse41.com/services/${service.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Pulse41`,
      description: service.tagline || service.description,
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const [allServices, allSolutions] = await Promise.all([
    getServices(),
    getSolutions(),
  ])

  return (
    <ServiceDetailPageClient
      service={service}
      allServices={allServices}
      relatedSolutions={allSolutions}
    />
  )
}
