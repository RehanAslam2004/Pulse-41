import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { PipelineClient } from '@/components/admin/crm/PipelineClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Lead Pipeline · Pulse41 Control',
}

export default async function AdminPipelinePage() {
  const supabase = createAdminClient()

  const [contactsRes, quotesRes] = await Promise.all([
    supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false }),
  ])

  const contacts = contactsRes.data || []
  const quotes = quotesRes.data || []

  const unified = [
    ...contacts.map((c) => ({
      id: c.id,
      type: 'contact' as const,
      name: c.name,
      email: c.email,
      company: c.company,
      scope: c.project_type || 'General Inquiry',
      budget: c.budget || 'Custom',
      status: c.status,
      created_at: c.created_at,
    })),
    ...quotes.map((q) => ({
      id: q.id,
      type: 'quote' as const,
      name: q.name,
      email: q.email,
      company: q.company,
      scope: `${q.tier || 'Custom'} Scope`,
      budget: q.budget || 'Scope Estimate',
      status: q.status,
      created_at: q.created_at,
    })),
  ]

  return <PipelineClient initialLeads={unified} />
}
