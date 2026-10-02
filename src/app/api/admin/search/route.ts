import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q) {
    return NextResponse.json({ results: [] })
  }

  try {
    const supabase = createAdminClient()
    const pattern = `%${q}%`

    // Search in parallel across relevant enterprise collections
    const [
      contactsRes,
      quotesRes,
      orgsRes,
      caseStudiesRes,
      insightsRes,
      jobsRes,
    ] = await Promise.all([
      supabase
        .from('contact_submissions')
        .select('id, name, email, company, project_type, status')
        .or(`name.ilike.${pattern},email.ilike.${pattern},company.ilike.${pattern}`)
        .limit(4),
      supabase
        .from('quote_requests')
        .select('id, name, email, company, tier, status')
        .or(`name.ilike.${pattern},email.ilike.${pattern},company.ilike.${pattern}`)
        .limit(4),
      supabase
        .from('organizations')
        .select('id, name, industry, status')
        .ilike('name', pattern)
        .limit(4),
      supabase
        .from('case_studies')
        .select('id, title, slug, tag, industry, is_published')
        .or(`title.ilike.${pattern},industry.ilike.${pattern}`)
        .limit(4),
      supabase
        .from('blog_posts')
        .select('id, title, slug, category, is_published')
        .or(`title.ilike.${pattern},category.ilike.${pattern}`)
        .limit(4),
      supabase
        .from('job_listings')
        .select('id, title, department, location, is_active')
        .or(`title.ilike.${pattern},department.ilike.${pattern}`)
        .limit(4),
    ])

    const results: any[] = []

    // 1. Leads & Inquiries
    if (contactsRes.data) {
      for (const item of contactsRes.data) {
        results.push({
          id: `lead-${item.id}`,
          title: item.name,
          subtitle: `${item.company || 'Inquiry'} · ${item.email} · Status: ${item.status}`,
          category: 'CRM',
          url: `/admin/leads?id=${item.id}`,
          badge: 'Lead',
        })
      }
    }

    // 2. Quote Requests
    if (quotesRes.data) {
      for (const item of quotesRes.data) {
        results.push({
          id: `quote-${item.id}`,
          title: `${item.name} (${item.company || 'Enterprise'})`,
          subtitle: `Quote Request · Scope: ${item.tier || 'Custom'} · ${item.email}`,
          category: 'CRM',
          url: `/admin/quotes?id=${item.id}`,
          badge: 'Quote',
        })
      }
    }

    // 3. Organizations
    if (orgsRes.data) {
      for (const item of orgsRes.data) {
        results.push({
          id: `org-${item.id}`,
          title: item.name,
          subtitle: `Organization · ${item.industry || 'General Industry'} · ${item.status}`,
          category: 'CRM',
          url: `/admin/organizations?id=${item.id}`,
          badge: 'Account',
        })
      }
    }

    // 4. Case Studies
    if (caseStudiesRes.data) {
      for (const item of caseStudiesRes.data) {
        results.push({
          id: `case-${item.id}`,
          title: item.title,
          subtitle: `Case Study · Industry: ${item.industry} · ${item.is_published ? 'Published' : 'Draft'}`,
          category: 'Content',
          url: `/admin/content/case-studies?slug=${item.slug}`,
          badge: 'Case Study',
        })
      }
    }

    // 5. Insights
    if (insightsRes.data) {
      for (const item of insightsRes.data) {
        results.push({
          id: `insight-${item.id}`,
          title: item.title,
          subtitle: `Insight · Category: ${item.category} · ${item.is_published ? 'Published' : 'Draft'}`,
          category: 'Content',
          url: `/admin/content/insights?slug=${item.slug}`,
          badge: 'Insight',
        })
      }
    }

    // 6. Careers
    if (jobsRes.data) {
      for (const item of jobsRes.data) {
        results.push({
          id: `job-${item.id}`,
          title: item.title,
          subtitle: `Position · Dept: ${item.department} · ${item.location} · ${item.is_active ? 'Active' : 'Closed'}`,
          category: 'Careers',
          url: `/admin/careers/jobs?id=${item.id}`,
          badge: 'Job',
        })
      }
    }

    return NextResponse.json({ results })
  } catch (err: any) {
    console.error('Admin search error:', err)
    return NextResponse.json({ error: 'Search failed', details: err.message }, { status: 500 })
  }
}
