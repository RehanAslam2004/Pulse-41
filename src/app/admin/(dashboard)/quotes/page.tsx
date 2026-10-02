import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { QuotesClient } from '@/components/admin/crm/QuotesClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Quote Requests · Pulse41 Control',
}

export default async function AdminQuotesPage() {
  const supabase = createAdminClient()
  const { data: quotes } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return <QuotesClient initialQuotes={quotes || []} />
}
