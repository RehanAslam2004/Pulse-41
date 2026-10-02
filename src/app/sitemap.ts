import type { MetadataRoute } from 'next'
import {
  getAllServiceSlugs,
  getAllSolutionSlugs,
  getAllCaseStudySlugs,
  getAllBlogPostSlugs,
} from '@/lib/supabase/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pulse41.com'
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/ai-solutions',
    '/industries',
    '/solutions',
    '/case-studies',
    '/insights',
    '/pricing',
    '/careers',
    '/contact',
    '/privacy',
    '/terms',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  const [serviceSlugs, solutionSlugs, caseStudySlugs, blogSlugs] = await Promise.all([
    getAllServiceSlugs(),
    getAllSolutionSlugs(),
    getAllCaseStudySlugs(),
    getAllBlogPostSlugs(),
  ])

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const solutionEntries: MetadataRoute.Sitemap = solutionSlugs.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [
    ...staticEntries,
    ...serviceEntries,
    ...solutionEntries,
    ...caseStudyEntries,
    ...blogEntries,
  ]
}
