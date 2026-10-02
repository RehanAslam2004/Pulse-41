/* ── Pulse41 Design Tokens ─────────────────────────────────────────── */

export const C = {
  navy: '#1E293B',
  blue: '#3B82F6',
  lightBlue: '#93C5FD',
  gray: '#CBD5E1',
  offWhite: '#F8FAFC',
  navyDeep: '#0F172A',
  blueDark: '#2563EB',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  borderSubtle: 'rgba(203,213,225,0.15)',
}

export type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'ai-solutions'
  | 'industries'
  | 'solutions'
  | 'case-studies'
  | 'insights'
  | 'pricing'
  | 'careers'
  | 'contact'

/** Map page keys to URL paths */
export const pageRoutes: Record<Page, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  'ai-solutions': '/ai-solutions',
  industries: '/industries',
  solutions: '/solutions',
  'case-studies': '/case-studies',
  insights: '/insights',
  pricing: '/pricing',
  careers: '/careers',
  contact: '/contact',
}
