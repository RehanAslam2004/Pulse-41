import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// --- In-Memory Rate Limiting for Brute-Force Protection ---
interface RateLimitRecord {
  attempts: number
  firstAttempt: number
  lockedUntil: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

const MAX_FAILED_ATTEMPTS = 5
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes lockout

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.lockedUntil && now - record.firstAttempt > ATTEMPT_WINDOW_MS) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || request.headers.get('cf-connecting-ip') || 'unknown-ip'
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const body = await request.json()
    const { email, password } = body

    // 1. Strict Input Validation & Normalization
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Email format sanity check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 120 || password.length > 200) {
      return NextResponse.json(
        { error: 'Invalid credentials format.' },
        { status: 400 }
      )
    }

    // 2. Rate Limiting Check (by IP + Normalized Email)
    const rateLimitKey = `${ip}:${normalizedEmail}`
    const now = Date.now()
    const record = rateLimitMap.get(rateLimitKey)

    if (record) {
      if (now < record.lockedUntil) {
        const remainingMin = Math.ceil((record.lockedUntil - now) / 60000)
        console.warn(`[SECURITY LOCKOUT] Blocked request for ${normalizedEmail} from ${ip}. Remaining: ${remainingMin}m`)
        return NextResponse.json(
          {
            error: `Security Lockout: Too many failed login attempts. Please wait ${remainingMin} minute(s) before trying again.`,
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((record.lockedUntil - now) / 1000)),
            },
          }
        )
      }

      // If attempt window expired, reset attempts
      if (now - record.firstAttempt > ATTEMPT_WINDOW_MS) {
        record.attempts = 0
        record.firstAttempt = now
        record.lockedUntil = 0
      }
    }

    // 3. Supabase Client Initialization
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

    // 4. Authenticate
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    })

    if (error || !data.user) {
      // Record failed attempt
      const current = rateLimitMap.get(rateLimitKey) || {
        attempts: 0,
        firstAttempt: now,
        lockedUntil: 0,
      }
      current.attempts += 1

      if (current.attempts >= MAX_FAILED_ATTEMPTS) {
        current.lockedUntil = now + LOCKOUT_DURATION_MS
        console.warn(`[SECURITY ALERT] Rate limit triggered for ${normalizedEmail} from ${ip}. Locked for 15 min.`)
      }

      rateLimitMap.set(rateLimitKey, current)

      console.warn(`[SECURITY AUDIT] Failed admin sign-in attempt (${current.attempts}/${MAX_FAILED_ATTEMPTS}) for ${normalizedEmail} from ${ip}`)

      return NextResponse.json(
        { error: 'Invalid credentials or unauthorized account.' },
        { status: 401 }
      )
    }

    // 5. Verify Administrator Role
    const role = data.user.app_metadata?.role
    if (role !== 'admin') {
      await supabase.auth.signOut()
      console.warn(`[SECURITY VIOLATION] Non-admin user (${normalizedEmail}) attempted admin portal access from ${ip}`)
      return NextResponse.json(
        { error: 'Access denied: Account does not possess administrative privileges.' },
        { status: 403 }
      )
    }

    // 6. Successful Authentication: Reset Rate Limit
    rateLimitMap.delete(rateLimitKey)
    console.log(`[SECURITY AUDIT] Successful admin sign-in: ${normalizedEmail} from ${ip}`)

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: 'admin',
        name: data.user.user_metadata?.name || 'Administrator',
      },
    })
  } catch (err) {
    console.error('Admin authentication error:', err)
    return NextResponse.json(
      { error: 'Internal security error during authentication.' },
      { status: 500 }
    )
  }
}
