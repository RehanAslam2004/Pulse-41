-- ==============================================================================
-- PULSE41 CONTROL — ENTERPRISE OPERATIONS PLATFORM SCHEMA
-- Migration: 003_pulse41_control.sql
-- ==============================================================================

-- 1. Organizations Table (CRM Accounts)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  industry TEXT,
  website TEXT,
  country TEXT DEFAULT 'International',
  tier TEXT DEFAULT 'Standard',
  status TEXT NOT NULL DEFAULT 'prospect', -- 'active', 'prospect', 'partner', 'churned'
  owner TEXT DEFAULT 'admin@pulse41.com',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_organizations_updated_at ON public.organizations;
CREATE TRIGGER trigger_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. Contacts Table (CRM People)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  source TEXT DEFAULT 'Inbound Inquiry',
  status TEXT NOT NULL DEFAULT 'lead', -- 'lead', 'active', 'inactive'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_contacts_updated_at ON public.contacts;
CREATE TRIGGER trigger_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Admin Users & RBAC Table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Super Admin', -- 'Super Admin', 'Content Manager', 'Recruiter', 'Lead Manager'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'disabled'
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Admin Activity Audit Logs
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT NOT NULL DEFAULT 'admin@pulse41.com',
  action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'STATUS_CHANGE', 'ASSIGN', 'CONVERT_LEAD', 'SETTINGS_UPDATE'
  entity_type TEXT NOT NULL, -- 'lead', 'quote', 'organization', 'contact', 'case_study', 'blog_post', 'service', 'job', 'application', 'system'
  entity_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Admin Notifications
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'system', -- 'lead', 'quote', 'application', 'content', 'system'
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Content Revisions (Audit & Rollback)
CREATE TABLE IF NOT EXISTS public.content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL, -- 'case_study', 'blog_post', 'service', 'solution', 'job'
  entity_id UUID NOT NULL,
  version_number INT NOT NULL DEFAULT 1,
  snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  author_email TEXT NOT NULL DEFAULT 'admin@pulse41.com',
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Media Assets Registry
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT DEFAULT 0,
  mime_type TEXT DEFAULT 'image/jpeg',
  category TEXT NOT NULL DEFAULT 'images', -- 'images', 'videos', 'documents', 'brand_assets', 'downloads'
  uploaded_by TEXT DEFAULT 'admin@pulse41.com',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Site Settings & Enterprise Configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Storage Bucket for Media Library (if not already created)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pulse41-media',
  'pulse41-media',
  true,
  20971520, -- 20 MB
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 20971520;

-- 10. Enable Row Level Security (RLS)
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Restricted to authenticated admins
DO $$
BEGIN
  -- Organizations
  DROP POLICY IF EXISTS "orgs_admin_all" ON public.organizations;
  CREATE POLICY "orgs_admin_all" ON public.organizations FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Contacts
  DROP POLICY IF EXISTS "contacts_admin_all" ON public.contacts;
  CREATE POLICY "contacts_admin_all" ON public.contacts FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Admin Users
  DROP POLICY IF EXISTS "admin_users_all" ON public.admin_users;
  CREATE POLICY "admin_users_all" ON public.admin_users FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Activity Logs
  DROP POLICY IF EXISTS "activity_logs_all" ON public.admin_activity_logs;
  CREATE POLICY "activity_logs_all" ON public.admin_activity_logs FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Notifications
  DROP POLICY IF EXISTS "notifications_all" ON public.admin_notifications;
  CREATE POLICY "notifications_all" ON public.admin_notifications FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Content Revisions
  DROP POLICY IF EXISTS "revisions_all" ON public.content_revisions;
  CREATE POLICY "revisions_all" ON public.content_revisions FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Media Assets
  DROP POLICY IF EXISTS "media_assets_all" ON public.media_assets;
  CREATE POLICY "media_assets_all" ON public.media_assets FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Site Settings
  DROP POLICY IF EXISTS "site_settings_all" ON public.site_settings;
  CREATE POLICY "site_settings_all" ON public.site_settings FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  -- Storage objects policies for pulse41-media
  DROP POLICY IF EXISTS "pulse41_media_public_read" ON storage.objects;
  CREATE POLICY "pulse41_media_public_read" ON storage.objects
    FOR SELECT TO anon, authenticated
    USING (bucket_id = 'pulse41-media');

  DROP POLICY IF EXISTS "pulse41_media_admin_write" ON storage.objects;
  CREATE POLICY "pulse41_media_admin_write" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
      bucket_id = 'pulse41-media' AND
      ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    );

  DROP POLICY IF EXISTS "pulse41_media_admin_delete" ON storage.objects;
  CREATE POLICY "pulse41_media_admin_delete" ON storage.objects
    FOR DELETE TO authenticated
    USING (
      bucket_id = 'pulse41-media' AND
      ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    );
END $$;

-- 11. Initial Seeding: Admin Users & Default Settings
INSERT INTO public.admin_users (email, name, role, status, last_login)
VALUES 
  ('admin@pulse41.com', 'Pulse41 Administrator', 'Super Admin', 'active', now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.site_settings (key, value)
VALUES
  ('general', '{"companyName": "Pulse41", "tagline": "Tech. Think. Thrive.", "contactEmail": "contact@pulse41.com", "supportEmail": "sysadmin@pulse41.com"}'::jsonb),
  ('seo', '{"defaultTitle": "Pulse41 — Tech. Think. Thrive.", "defaultDescription": "AI-powered products, digital experiences and technology solutions.", "ogImage": "/og-image.png"}'::jsonb),
  ('social', '{"linkedin": "https://linkedin.com/company/pulse41", "github": "https://github.com/pulse41", "twitter": "https://twitter.com/pulse41"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 12. Back-Populate Organizations & Contacts from existing real submissions
DO $$
DECLARE
  org_zurich UUID;
  org_pixel UUID;
  org_anon UUID;
BEGIN
  -- 1. Enterprise AI Labs Zurich
  INSERT INTO public.organizations (name, industry, country, tier, status, notes)
  VALUES ('Enterprise AI Labs Zurich', 'Technology & Artificial Intelligence', 'Switzerland', 'Enterprise', 'prospect', 'Automated import from interactive calculator quote requests.')
  ON CONFLICT (name) DO UPDATE SET updated_at = now()
  RETURNING id INTO org_zurich;

  IF org_zurich IS NOT NULL THEN
    INSERT INTO public.contacts (organization_id, name, email, job_title, source, status)
    VALUES (org_zurich, 'Dr. Elena Rostova', 'elena.rostova.1790496281077@enterprise-ai-labs.ch', 'Head of AI Engineering', 'Quote Calculator', 'lead')
    ON CONFLICT DO NOTHING;
  END IF;

  -- 2. Pixel Pulse
  INSERT INTO public.organizations (name, industry, country, tier, status, notes)
  VALUES ('Pixel Pulse', 'Digital Products & Software Engineering', 'Pakistan', 'Growth', 'prospect', 'Inbound contact inquiry regarding enterprise SaaS & platform architecture.')
  ON CONFLICT (name) DO UPDATE SET updated_at = now()
  RETURNING id INTO org_pixel;

  IF org_pixel IS NOT NULL THEN
    INSERT INTO public.contacts (organization_id, name, email, job_title, source, status)
    VALUES (org_pixel, 'Muhammad Rehan', 'rehan2004aslam@gmail.com', 'Founder / Product Lead', 'Contact Form', 'lead')
    ON CONFLICT DO NOTHING;
  END IF;

  -- 3. Anon Direct Client
  INSERT INTO public.organizations (name, industry, country, tier, status, notes)
  VALUES ('Direct Client Account', 'General Consulting', 'International', 'Standard', 'prospect', 'Verified direct web submission.')
  ON CONFLICT (name) DO UPDATE SET updated_at = now()
  RETURNING id INTO org_anon;

  IF org_anon IS NOT NULL THEN
    INSERT INTO public.contacts (organization_id, name, email, job_title, source, status)
    VALUES (org_anon, 'Anon Test Lead', 'test@pulse41.test', 'Technical Director', 'Contact Form', 'lead')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Initial Activity Audit Log entries
  INSERT INTO public.admin_activity_logs (admin_email, action, entity_type, entity_id, details)
  VALUES 
    ('admin@pulse41.com', 'MIGRATION', 'system', '003_pulse41_control', '{"summary": "Pulse41 Control Enterprise Architecture Initialized", "tables": ["organizations", "contacts", "admin_users", "activity_logs", "notifications", "revisions", "media_assets", "site_settings"]}'::jsonb),
    ('admin@pulse41.com', 'CONVERT_LEAD', 'organization', org_zurich::text, '{"organization": "Enterprise AI Labs Zurich", "contact": "Dr. Elena Rostova"}'::jsonb),
    ('admin@pulse41.com', 'CONVERT_LEAD', 'organization', org_pixel::text, '{"organization": "Pixel Pulse", "contact": "Muhammad Rehan"}'::jsonb);

  -- Initial Notification entries
  INSERT INTO public.admin_notifications (title, message, type, link, is_read)
  VALUES
    ('Pulse41 Control Online', 'Enterprise operations platform successfully upgraded and connected to PostgreSQL telemetry.', 'system', '/admin/system-health', false),
    ('New Enterprise Lead', 'Dr. Elena Rostova submitted an enterprise AI calculator quote request ($28,500/mo).', 'quote', '/admin/leads', false),
    ('Inquiry Pending Review', 'Muhammad Rehan requested SaaS architecture consultation.', 'lead', '/admin/leads', false);
END $$;
