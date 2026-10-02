import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = sanitize(body.email || '')
    const source = sanitize(body.source || 'website')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('newsletter_subscriptions').upsert(
      {
        email,
        source,
        is_active: true,
        subscribed_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )

    if (error) {
      console.error('[Newsletter Supabase Error]:', error)
      return NextResponse.json(
        { error: 'Failed to process subscription.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully to Pulse41 engineering insights.',
    })
  } catch (err) {
    console.error('[Newsletter API Error]:', err)
    return NextResponse.json(
      { error: 'Invalid request payload or server error.' },
      { status: 500 }
    )
  }
}
