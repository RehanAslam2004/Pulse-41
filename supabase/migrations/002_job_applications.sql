-- ------------------------------------------------------------------------------
-- Pulse41 Migration 002: Job Applications Table & Resume Storage Bucket
-- ------------------------------------------------------------------------------

-- 1. Create Job Applications Table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.job_listings(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_job_applications_updated_at ON public.job_applications;
CREATE TRIGGER trigger_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. Row-Level Security (RLS) on Job Applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Candidates can submit applications
DROP POLICY IF EXISTS "job_applications_public_insert" ON public.job_applications;
CREATE POLICY "job_applications_public_insert" ON public.job_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated administrators can view, update, and delete applications
DROP POLICY IF EXISTS "job_applications_admin_all" ON public.job_applications;
CREATE POLICY "job_applications_admin_all" ON public.job_applications
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 3. Storage Bucket: pulse41-resumes (10MB file limit for PDF / DOC / DOCX)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pulse41-resumes',
  'pulse41-resumes',
  true,
  10485760, -- 10 MB
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream'
  ];

-- Storage bucket RLS policies for pulse41-resumes
DROP POLICY IF EXISTS "pulse41_resumes_public_read" ON storage.objects;
CREATE POLICY "pulse41_resumes_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'pulse41-resumes');

DROP POLICY IF EXISTS "pulse41_resumes_public_insert" ON storage.objects;
CREATE POLICY "pulse41_resumes_public_insert" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'pulse41-resumes');

DROP POLICY IF EXISTS "pulse41_resumes_admin_delete" ON storage.objects;
CREATE POLICY "pulse41_resumes_admin_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'pulse41-resumes' AND
    ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  );
