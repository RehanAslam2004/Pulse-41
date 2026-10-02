import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    })

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
    }

    const role = user.app_metadata?.role
    if (role !== 'admin') {
      return NextResponse.json({ authenticated: false, user: null, error: 'Not an administrator' }, { status: 403 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: 'admin',
        name: user.user_metadata?.name || 'Administrator',
      },
    })
  } catch (err) {
    console.error('Session verify error:', err)
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 })
  }
}
