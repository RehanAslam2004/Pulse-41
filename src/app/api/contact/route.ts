import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: string
  email?: string
  company?: string
  projectType?: string
  budget?: string
  message?: string
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim()
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json()

    const name = sanitize(body.name || '')
    const email = sanitize(body.email || '')
    const company = sanitize(body.company || '')
    const projectType = sanitize(body.projectType || '')
    const budget = sanitize(body.budget || '')
    const message = sanitize(body.message || '')

    // Validation checks
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Valid name is required (2-100 characters).' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { error: 'A valid corporate email is required.' },
        { status: 400 }
      )
    }

    if (!projectType) {
      return NextResponse.json(
        { error: 'Please select a primary project scope.' },
        { status: 400 }
      )
    }

    if (!message || message.length < 10 || message.length > 3000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 3,000 characters.' },
        { status: 400 }
      )
    }

    // Persist to Supabase contact_submissions table
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const supabase = createAdminClient()
      const { error: dbError } = await supabase.from('contact_submissions').insert({
        name,
        email,
        company: company || null,
        project_type: projectType || null,
        budget: budget || null,
        message,
        status: 'new',
      })

      if (dbError) {
        console.error('[Contact DB Insert Error]:', dbError)
      }
    } catch (dbErr) {
      console.error('[Contact DB Connection Error]:', dbErr)
    }

    console.info('[Contact Inquiry Received]:', {
      name,
      email,
      company,
      projectType,
      budget,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. A lead architect will contact you within 24 hours.',
    })
  } catch (err) {
    console.error('[Contact API Error]:', err)
    return NextResponse.json(
      { error: 'Invalid request payload or server error.' },
      { status: 500 }
    )
  }
}
