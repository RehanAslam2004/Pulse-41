import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { ContentStudioClient, ContentTableKey } from '@/components/admin/cms/ContentStudioClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Content Studio · Pulse41 Control',
}

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>
}) {
  const supabase = createAdminClient()
  const params = await (searchParams || Promise.resolve({ tab: 'case_studies' }))

  const [
    caseStudiesRes,
    blogPostsRes,
    servicesRes,
    solutionsRes,
    industriesRes,
    testimonialsRes,
  ] = await Promise.all([
    supabase.from('case_studies').select('*').order('created_at', { ascending: false }),
    supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
    supabase.from('services').select('*').order('sort_order', { ascending: true }),
    supabase.from('solutions').select('*').order('sort_order', { ascending: true }),
    supabase.from('industries').select('*').order('sort_order', { ascending: true }),
    supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
  ])

  const validTabs: ContentTableKey[] = [
    'case_studies',
    'blog_posts',
    'services',
    'solutions',
    'industries',
    'testimonials',
  ]
  const initialTable: ContentTableKey = validTabs.includes(params.tab as ContentTableKey)
    ? (params.tab as ContentTableKey)
    : 'case_studies'

  return (
    <ContentStudioClient
      initialTable={initialTable}
      initialData={{
        case_studies: caseStudiesRes.data || [],
        blog_posts: blogPostsRes.data || [],
        services: servicesRes.data || [],
        solutions: solutionsRes.data || [],
        industries: industriesRes.data || [],
        testimonials: testimonialsRes.data || [],
      }}
    />
  )
}
