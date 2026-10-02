import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { LeadsManagerClient } from '@/components/admin/crm/LeadsManagerClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Leads & Inquiries CRM · Pulse41 Control',
}

export default async function AdminLeadsPage() {
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

  return (
    <LeadsManagerClient
      initialContacts={contactsRes.data || []}
      initialQuotes={quotesRes.data || []}
    />
  )
}
