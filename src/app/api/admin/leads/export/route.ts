import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

function escapeCsvCell(value: any): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const supabase = createAdminClient()

    const rows: string[][] = [
      ['Type', 'ID', 'Name', 'Email', 'Company', 'Tier / Type', 'Budget', 'Status', 'Date', 'Message / Source'],
    ]

    if (type === 'all' || type === 'contacts') {
      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (contacts) {
        for (const c of contacts) {
          rows.push([
            'Contact Inquiry',
            c.id,
            c.name,
            c.email,
            c.company || '',
            c.project_type || '',
            c.budget || '',
            c.status,
            c.created_at,
            c.message,
          ])
        }
      }
    }

    if (type === 'all' || type === 'quotes') {
      const { data: quotes } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (quotes) {
        for (const q of quotes) {
          rows.push([
            'Quote Request',
            q.id,
            q.name,
            q.email,
            q.company || '',
            `${q.tier || ''} - ${q.project_scope || ''}`,
            q.budget || '',
            q.status,
            q.created_at,
            q.message || '',
          ])
        }
      }
    }

    if (type === 'all' || type === 'newsletters') {
      const { data: newsletters } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false })

      if (newsletters) {
        for (const n of newsletters) {
          rows.push([
            'Newsletter Subscriber',
            n.id,
            'Subscriber',
            n.email,
            '',
            'Subscription',
            '',
            n.is_active ? 'Active' : 'Unsubscribed',
            n.subscribed_at,
            `Source: ${n.source}`,
          ])
        }
      }
    }

    if (type === 'all' || type === 'applications') {
      const { data: applications } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (applications) {
        for (const a of applications) {
          rows.push([
            'Job Application',
            a.id,
            a.name,
            a.email,
            a.job_title,
            a.phone || '',
            '',
            a.status,
            a.created_at,
            `Resume: ${a.resume_url} | LinkedIn: ${a.linkedin_url || 'N/A'} | Note: ${a.cover_letter || 'N/A'}`,
          ])
        }
      }
    }

    const csvContent = rows.map(r => r.map(escapeCsvCell).join(',')).join('\r\n')
    const filename = `pulse41-leads-${new Date().toISOString().split('T')[0]}.csv`

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    console.error('CSV Export Error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to generate CSV export' },
      { status: 500 }
    )
  }
}
