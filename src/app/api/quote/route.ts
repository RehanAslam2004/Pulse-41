import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = sanitize(body.name || '')
    const email = sanitize(body.email || '')
    const company = sanitize(body.company || '')
    const tier = sanitize(body.tier || '')
    const projectScope = sanitize(body.projectScope || '')
    const budget = sanitize(body.budget || '')
    const message = sanitize(body.message || '')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'A valid name is required.' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('quote_requests').insert({
      name,
      email,
      company: company || null,
      tier: tier || null,
      project_scope: projectScope || null,
      budget: budget || null,
      message: message || null,
      status: 'new',
    })

    if (error) {
      console.error('[Quote Supabase Error]:', error)
      return NextResponse.json(
        { error: 'Failed to submit quote inquiry.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Quote inquiry received. Our solutions team will review your specifications.',
    })
  } catch (err) {
    console.error('[Quote API Error]:', err)
    return NextResponse.json(
      { error: 'Invalid request payload or server error.' },
      { status: 500 }
    )
  }
}
