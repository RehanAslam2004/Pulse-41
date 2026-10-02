import React from 'react'
import { RolesClient } from '@/components/admin/system/RolesClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Roles & Permissions · Pulse41 Control',
}

export default function AdminRolesPage() {
  return <RolesClient />
}
