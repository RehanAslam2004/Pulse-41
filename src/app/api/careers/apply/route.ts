import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const resumeFile = formData.get('resume') as File | null
    const name = ((formData.get('name') || formData.get('candidate_name')) as string | null)?.trim()
    const email = ((formData.get('email') || formData.get('candidate_email')) as string | null)?.trim()
    const phone = ((formData.get('phone') || formData.get('candidate_phone')) as string | null)?.trim() || null
    const linkedin_url = (formData.get('linkedin_url') as string)?.trim() || null
    const portfolio_url = (formData.get('portfolio_url') as string)?.trim() || null
    const job_title = ((formData.get('job_title') || formData.get('role_title')) as string)?.trim() || 'General Application'
    const job_id = ((formData.get('job_id') || formData.get('role_id')) as string)?.trim() || null
    const cover_letter = (formData.get('cover_letter') as string)?.trim() || null

    if (!name || !email || !resumeFile) {
      return NextResponse.json(
        { error: 'Name, email, and resume file are mandatory.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Validate file size (10 MB max)
    const MAX_SIZE = 10 * 1024 * 1024
    if (resumeFile.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Resume file size cannot exceed 10 MB.' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // 1. Upload resume to Supabase Storage bucket: pulse41-resumes
    const fileExt = resumeFile.name.split('.').pop()?.toLowerCase() || 'pdf'
    const sanitizedBase = resumeFile.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
    const fileName = `${Date.now()}-${sanitizedBase}.${fileExt}`
    const filePath = `resumes/${fileName}`

    const arrayBuffer = await resumeFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('pulse41-resumes')
      .upload(filePath, buffer, {
        contentType: resumeFile.type || 'application/pdf',
        upsert: false,
      })

    if (uploadError) {
      console.error('Resume storage upload failed:', uploadError)
      throw new Error(`Failed to upload resume to storage: ${uploadError.message}`)
    }

    const { data: urlData } = supabase.storage
      .from('pulse41-resumes')
      .getPublicUrl(filePath)

    const resume_url = urlData.publicUrl

    // 2. Insert application into public.job_applications table
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const validJobId = job_id && uuidRegex.test(job_id) ? job_id : null

    const { data: appData, error: dbError } = await supabase
      .from('job_applications')
      .insert({
        job_id: validJobId,
        job_title,
        name,
        email,
        phone,
        linkedin_url,
        portfolio_url,
        resume_url,
        cover_letter,
        status: 'new',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Job application DB insert failed:', dbError)
      throw dbError
    }

    return NextResponse.json({
      success: true,
      message: 'Application received and logged.',
      application_id: appData.id,
      applicationId: appData.id,
      resume_url,
      resumeUrl: resume_url,
    })
  } catch (err: any) {
    console.error('Apply API error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error processing application.' },
      { status: 500 }
    )
  }
}
