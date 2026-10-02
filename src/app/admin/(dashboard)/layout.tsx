import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/shell/AdminShell'

export const metadata = {
  title: 'Pulse41 Control · Enterprise Operations Platform',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let userEmail = 'admin@pulse41.com'
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      userEmail = user.email
    }
  } catch (err) {
    // Fallback email
  }

  return (
    <AdminShell userEmail={userEmail}>
      {children}
    </AdminShell>
  )
}
