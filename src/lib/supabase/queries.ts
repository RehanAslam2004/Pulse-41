import { createAdminClient } from './admin'
import { services as fallbackServices, type ServicePractice } from '@/content/services'
import { solutions as fallbackSolutions, type Solution } from '@/content/solutions'
import { industries as fallbackIndustries, type Industry } from '@/content/industries'
import { fallbackCaseStudies, type CaseStudy } from '@/content/case-studies'
import { fallbackBlogPosts, type BlogPost } from '@/content/blog'

export interface CaseStudyItem {
  id?: string
  tag: string
  industry: string
  title: string
  slug: string
  challenge: string
  solution: string
  result: string
  tech: string[]
  coverImageUrl?: string
  isFeatured?: boolean
  metrics?: { label: string; value: string }[]
  timeline?: string
  clientType?: string
}

export interface BlogPostItem {
  id?: string
  title: string
  slug: string
  cat: string
  excerpt: string
  content?: string
  coverImageUrl?: string
  read: string
  date: string
  authorName?: string
  authorRole?: string
  authorAvatar?: string
  isFeatured?: boolean
}

export interface JobListingItem {
  id?: string
  title: string
  dept: string
  type: string
  location: string
  desc: string
  requirements?: string[]
  benefits?: string[]
  applyUrl?: string
}

export interface TestimonialItem {
  id?: string
  name: string
  title: string
  description: string
  imageUrl?: string
}

/**
 * Fetch active services from Supabase, falling back to local content
 */
export async function getServices(): Promise<ServicePractice[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackServices
    }

    return data.map((row) => ({
      num: row.num,
      title: row.title,
      slug: row.slug,
      tagline: row.tagline,
      typicalOutcomes: row.typical_outcomes,
      description: row.description,
      coreCapabilities: row.core_capabilities,
      capabilities: row.capabilities,
      detailedAreas: (row.detailed_areas as any) || undefined,
      controlFramework: (row.control_framework as string[]) || undefined,
      color: row.color,
    }))
  } catch (err) {
    console.error('getServices error:', err)
    return fallbackServices
  }
}

/**
 * Fetch single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<ServicePractice | null> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      const fallback = fallbackServices.find((s) => s.slug === slug)
      return fallback || null
    }

    return {
      num: data.num,
      title: data.title,
      slug: data.slug,
      tagline: data.tagline,
      typicalOutcomes: data.typical_outcomes,
      description: data.description,
      coreCapabilities: data.core_capabilities,
      capabilities: data.capabilities,
      detailedAreas: (data.detailed_areas as any) || undefined,
      controlFramework: (data.control_framework as string[]) || undefined,
      color: data.color,
    }
  } catch {
    const fallback = fallbackServices.find((s) => s.slug === slug)
    return fallback || null
  }
}

/**
 * Fetch all service slugs for static generation
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const services = await getServices()
    return services.map((s) => s.slug)
  } catch {
    return fallbackServices.map((s) => s.slug)
  }
}

/**
 * Fetch active solutions from Supabase, falling back to local content
 */
export async function getSolutions(): Promise<Solution[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackSolutions
    }

    return data.map((row) => ({
      num: row.num,
      title: row.title,
      productName: row.product_name,
      slug: row.slug,
      tagline: row.tagline,
      businessNeed: row.business_need,
      coreComponentsText: row.core_components_text,
      coreComponents: row.core_components,
      capabilities: row.capabilities,
      description: row.description,
      icon: row.icon,
    }))
  } catch (err) {
    console.error('getSolutions error:', err)
    return fallbackSolutions
  }
}

/**
 * Fetch single solution by slug
 */
export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      const fallback = fallbackSolutions.find((s) => s.slug === slug)
      return fallback || null
    }

    return {
      num: data.num,
      title: data.title,
      productName: data.product_name,
      slug: data.slug,
      tagline: data.tagline,
      businessNeed: data.business_need,
      coreComponentsText: data.core_components_text,
      coreComponents: data.core_components,
      capabilities: data.capabilities,
      description: data.description,
      icon: data.icon,
    }
  } catch {
    const fallback = fallbackSolutions.find((s) => s.slug === slug)
    return fallback || null
  }
}

/**
 * Fetch all solution slugs for static generation
 */
export async function getAllSolutionSlugs(): Promise<string[]> {
  try {
    const solutions = await getSolutions()
    return solutions.map((s) => s.slug)
  } catch {
    return fallbackSolutions.map((s) => s.slug)
  }
}

/**
 * Fetch active industries from Supabase, falling back to local content
 */
export async function getIndustries(): Promise<Industry[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackIndustries.map((row) => ({
        name: row.name,
        slug: row.slug,
        iconName: row.iconName || 'Building2',
        tagline: row.tagline,
        description: row.description,
        capabilities: row.capabilities,
        relevantSolutions: row.relevantSolutions,
        primary: row.primary,
      }))
    }

    return data.map((row) => ({
      name: row.name,
      slug: row.slug,
      iconName: row.icon_name,
      tagline: row.tagline,
      description: row.description,
      capabilities: row.capabilities,
      relevantSolutions: row.relevant_solutions,
      primary: row.is_primary,
    }))
  } catch (err) {
    console.error('getIndustries error:', err)
    return fallbackIndustries.map((row) => ({
      name: row.name,
      slug: row.slug,
      iconName: row.iconName || 'Building2',
      tagline: row.tagline,
      description: row.description,
      capabilities: row.capabilities,
      relevantSolutions: row.relevantSolutions,
      primary: row.primary,
    }))
  }
}

/**
 * Fetch single industry by slug
 */
export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const industries = await getIndustries()
  return industries.find((i) => i.slug === slug) || null
}

/**
 * Fetch all industry slugs for static generation
 */
export async function getAllIndustrySlugs(): Promise<string[]> {
  try {
    const industries = await getIndustries()
    return industries.map((i) => i.slug)
  } catch {
    return fallbackIndustries.map((i) => i.slug)
  }
}

/**
 * Fetch published case studies from Supabase with fallback
 */
export async function getCaseStudies(): Promise<CaseStudyItem[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackCaseStudies
    }

    return data.map((row) => ({
      id: row.id,
      tag: row.tag,
      industry: row.industry,
      title: row.title,
      slug: row.slug,
      challenge: row.challenge,
      solution: row.solution_text,
      result: row.result,
      tech: row.tech_stack,
      coverImageUrl: row.cover_image_url || undefined,
      isFeatured: row.is_featured,
    }))
  } catch (err) {
    console.error('getCaseStudies error:', err)
    return fallbackCaseStudies
  }
}

/**
 * Fetch single case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyItem | null> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error || !data) {
      const fallback = fallbackCaseStudies.find((c) => c.slug === slug)
      return fallback || null
    }

    return {
      id: data.id,
      tag: data.tag,
      industry: data.industry,
      title: data.title,
      slug: data.slug,
      challenge: data.challenge,
      solution: data.solution_text,
      result: data.result,
      tech: data.tech_stack,
      coverImageUrl: data.cover_image_url || undefined,
      isFeatured: data.is_featured,
    }
  } catch {
    const fallback = fallbackCaseStudies.find((c) => c.slug === slug)
    return fallback || null
  }
}

/**
 * Fetch all case study slugs for static generation
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const items = await getCaseStudies()
    return items.map((c) => c.slug)
  } catch {
    return fallbackCaseStudies.map((c) => c.slug)
  }
}

/**
 * Fetch published blog posts from Supabase with fallback
 */
export async function getBlogPosts(): Promise<BlogPostItem[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return fallbackBlogPosts
    }

    return data.map((row) => {
      const pubDate = new Date(row.published_at || row.created_at)
      const dateStr = pubDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        cat: row.category,
        excerpt: row.excerpt,
        content: row.content,
        coverImageUrl: row.cover_image_url || undefined,
        read: row.read_time,
        date: dateStr,
        authorName: row.author_name,
        authorRole: row.author_role,
        isFeatured: row.is_featured,
      }
    })
  } catch (err) {
    console.error('getBlogPosts error:', err)
    return fallbackBlogPosts
  }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error || !data) {
      const fallback = fallbackBlogPosts.find((b) => b.slug === slug)
      return fallback || null
    }

    const pubDate = new Date(data.published_at || data.created_at)
    const dateStr = pubDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      cat: data.category,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.cover_image_url || undefined,
      read: data.read_time,
      date: dateStr,
      authorName: data.author_name,
      authorRole: data.author_role,
      isFeatured: data.is_featured,
    }
  } catch {
    const fallback = fallbackBlogPosts.find((b) => b.slug === slug)
    return fallback || null
  }
}

/**
 * Fetch all blog post slugs for static generation
 */
export async function getAllBlogPostSlugs(): Promise<string[]> {
  try {
    const items = await getBlogPosts()
    return items.map((b) => b.slug)
  } catch {
    return fallbackBlogPosts.map((b) => b.slug)
  }
}

/**
 * Fetch active job listings from Supabase
 */
export async function getJobListings(): Promise<JobListingItem[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return []
    }

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      dept: row.department,
      type: row.type,
      location: row.location,
      desc: row.description,
      requirements: row.requirements,
      benefits: row.benefits,
      applyUrl: row.apply_url,
    }))
  } catch (err) {
    console.error('getJobListings error:', err)
    return []
  }
}

/**
 * Fetch active testimonials from Supabase
 */
export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return []
    }

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      title: row.title,
      description: row.description,
      imageUrl: row.image_url || undefined,
    }))
  } catch (err) {
    console.error('getTestimonials error:', err)
    return []
  }
}
