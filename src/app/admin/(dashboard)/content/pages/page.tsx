import React from 'react'
import Link from 'next/link'
import {
  Compass,
  ExternalLink,
  Eye,
  Layers,
  Sparkles,
  Cpu,
  Factory,
  Trophy,
  FileText,
  Briefcase,
  Mail,
  ShieldCheck,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Site Pages Manifest · Pulse41 Control',
}

interface PageManifestItem {
  title: string
  route: string
  cmsModule?: {
    name: string
    href: string
  }
  icon: React.ElementType
  type: 'Marketing' | 'Dynamic Catalog' | 'Operational' | 'Legal'
  description: string
}

const PAGES_MANIFEST: PageManifestItem[] = [
  {
    title: 'Homepage / Hero',
    route: '/',
    icon: Sparkles,
    type: 'Marketing',
    description: 'Executive intro, value propositions, dynamic metric counters, featured services.',
  },
  {
    title: 'About Pulse41',
    route: '/about',
    icon: Compass,
    type: 'Marketing',
    description: 'Corporate lineage, executive leadership team, infinite image marquee, company ethos.',
  },
  {
    title: 'Services Directory',
    route: '/services',
    cmsModule: { name: 'Manage Services', href: '/admin/content/services' },
    icon: Cpu,
    type: 'Dynamic Catalog',
    description: 'Full enterprise services portfolio with technical architecture details.',
  },
  {
    title: 'AI Solutions Directory',
    route: '/solutions',
    cmsModule: { name: 'Manage Solutions', href: '/admin/content/solutions' },
    icon: Sparkles,
    type: 'Dynamic Catalog',
    description: 'Enterprise AI capabilities, LLM integration suites, and intelligence frameworks.',
  },
  {
    title: 'Industries Directory',
    route: '/industries',
    cmsModule: { name: 'Manage Industries', href: '/admin/content/industries' },
    icon: Factory,
    type: 'Dynamic Catalog',
    description: 'Vertical-specific operational solutions for Finance, Healthcare, Retail & Defense.',
  },
  {
    title: 'Case Studies',
    route: '/case-studies',
    cmsModule: { name: 'Manage Case Studies', href: '/admin/content/case-studies' },
    icon: Trophy,
    type: 'Dynamic Catalog',
    description: 'Production client outcomes, quantifiable metrics, client testimonials.',
  },
  {
    title: 'Insights & Research',
    route: '/insights',
    cmsModule: { name: 'Manage Insights', href: '/admin/content/insights' },
    icon: FileText,
    type: 'Dynamic Catalog',
    description: 'Whitepapers, technical blogs, and architectural research papers.',
  },
  {
    title: 'Careers & Talent Portal',
    route: '/careers',
    cmsModule: { name: 'Manage Positions', href: '/admin/careers/jobs' },
    icon: Briefcase,
    type: 'Operational',
    description: 'Open requisitions, perks, company culture, and online resume application pipeline.',
  },
  {
    title: 'Contact & Advisory Inquiry',
    route: '/contact',
    cmsModule: { name: 'View Inquiries', href: '/admin/leads' },
    icon: Mail,
    type: 'Operational',
    description: 'Global inquiry intake and enterprise interactive project cost calculator.',
  },
  {
    title: 'Privacy & Security Policy',
    route: '/privacy',
    icon: ShieldCheck,
    type: 'Legal',
    description: 'Compliance disclosures, data handling policies, GDPR/SOC2 compliance framework.',
  },
]

export default function AdminPagesManifestPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Pages Manifest & Architecture
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Site-wide structure for Pulse41 public routes, associated CMS datasets, and preview shortcuts.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition"
        >
          <ExternalLink className="w-4 h-4 text-blue-600" />
          Preview Live Website
        </a>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAGES_MANIFEST.map((page) => {
          const Icon = page.icon
          return (
            <div
              key={page.route}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {page.type}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{page.title}</h3>
                <p className="text-xs font-mono text-blue-600 mt-0.5">{page.route}</p>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {page.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                {page.cmsModule ? (
                  <Link
                    href={page.cmsModule.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{page.cmsModule.name}</span>
                  </Link>
                ) : (
                  <span className="text-xs text-slate-400">Static / Config</span>
                )}

                <a
                  href={page.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
                  title="Open live route"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
