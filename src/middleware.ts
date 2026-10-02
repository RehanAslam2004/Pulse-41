import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isAdminPage = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isAdminApi = pathname.startsWith('/api/admin')
  const isLoginApi = pathname === '/api/admin/auth/login'

  const role = user?.app_metadata?.role

  // Protect Admin API Routes
  if (isAdminApi && !isLoginApi) {
    if (!user || role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator access required.' },
        { status: 401 }
      )
    }
    return supabaseResponse
  }

  // Protect Admin UI Pages
  if (isAdminPage) {
    if (isLoginPage) {
      if (user && role === 'admin') {
        const nextUrl = request.nextUrl.searchParams.get('next') || '/admin'
        return NextResponse.redirect(new URL(nextUrl, request.url))
      }
      return supabaseResponse
    }

    if (!user || role !== 'admin') {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
