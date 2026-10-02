import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  MessagesInboxClient,
  ClientMessage,
} from '@/components/admin/crm/MessagesInboxClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Client Messages & Inquiries Inbox · Pulse41 Control',
}

export default async function AdminInquiriesPage() {
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

  // Combine both sources into unified message records
  const unifiedMessages: ClientMessage[] = [
    ...contacts.map((c) => ({
      id: c.id,
      source: 'consultation' as const,
      type: 'contact' as const,
      name: c.name,
      email: c.email,
      company: c.company,
      scope: c.project_type || 'General Consulting Inquiry',
      budget: c.budget || 'Custom / Undisclosed',
      message: c.message || 'No written message provided.',
      status: c.status,
      created_at: c.created_at,
    })),
    ...quotes.map((q) => ({
      id: q.id,
      source: 'pricing_tier' as const,
      type: 'quote' as const,
      name: q.name,
      email: q.email,
      company: q.company,
      scope: `${q.tier || 'Custom'} (${q.project_scope || 'Calculator Scoping'})`,
      budget: q.budget || 'Scope Estimate',
      message: q.message || 'Pricing Tier scoping proposal requested.',
      status: q.status,
      created_at: q.created_at,
    })),
  ].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return <MessagesInboxClient initialMessages={unifiedMessages} />
}
