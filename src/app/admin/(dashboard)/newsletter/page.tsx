import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { NewsletterClient } from '@/components/admin/crm/NewsletterClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Newsletter Subscribers · Pulse41 Control',
}

export default async function AdminNewsletterPage() {
  const supabase = createAdminClient()
  const { data: subs } = await supabase
    .from('newsletter_subscriptions')
    .select('*')
    .order('subscribed_at', { ascending: false })

  return <NewsletterClient initialSubscribers={subs || []} />
}
