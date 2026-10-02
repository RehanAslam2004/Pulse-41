import React from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { ContactsClient } from '@/components/admin/crm/ContactsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Contacts Directory · Pulse41 Control',
}

export default async function AdminContactsPage() {
  const supabase = createAdminClient()

  const [contactsRes, orgsRes] = await Promise.all([
    supabase
      .from('contacts')
      .select('*, organizations(id, name, industry)')
      .order('created_at', { ascending: false }),
    supabase
      .from('organizations')
      .select('id, name')
      .order('name', { ascending: true }),
  ])

  return (
    <ContactsClient
      initialContacts={contactsRes.data || []}
      organizations={orgsRes.data || []}
    />
  )
}
