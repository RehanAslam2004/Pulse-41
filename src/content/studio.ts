export interface StudioCard {
  id: string
  platform: string
  title: string
  caption: string
  imageUrl: string
  href: string
  accent: string
}

export interface SocialLink {
  name: string
  handle: string
  href: string
}

/**
 * Editable configuration for the homepage "Inside the Studio" social media showcase.
 * Replace `href` URLs and `imageUrl` assets with your official Pulse41 studio reels/posts.
 */
export const studioCards: StudioCard[] = [
  {
    id: 'ai-lab',
    platform: 'LinkedIn',
    title: 'Applied AI & Architecture Reviews',
    caption: 'How our engineers scope, ground, and verify enterprise RAG systems before production rollout.',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&h=1200&fit=crop&q=85',
    href: '/ai-solutions',
    accent: '#2563EB',
  },
  {
    id: 'product-design',
    platform: 'Instagram',
    title: 'Design Systems & UI Craft',
    caption: 'From early wireframes to WCAG-aware production components across web and mobile.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1200&fit=crop&q=85',
    href: '/services',
    accent: '#3B82F6',
  },
  {
    id: 'studio-pods',
    platform: 'YouTube',
    title: 'Inside Our Senior Delivery Pods',
    caption: 'Daily sprint syncs, architecture whiteboarding, and cross-border shipping for US & EU teams.',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=1200&fit=crop&q=85',
    href: '/about',
    accent: '#1D4ED8',
  },
  {
    id: 'cloud-systems',
    platform: 'GitHub',
    title: 'Cloud, Security & Zero-Drift Ops',
    caption: 'Infrastructure-as-code templates, CI/CD release gates, and automated test pipelines.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=1200&fit=crop&q=85',
    href: '/solutions',
    accent: '#0F172A',
  },
  {
    id: 'growth-analytics',
    platform: 'X / Insights',
    title: 'Product Analytics & Digital Growth',
    caption: 'Connecting technical SEO, conversion engineering, and real customer telemetry.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=1200&fit=crop&q=85',
    href: '/insights',
    accent: '#2563EB',
  },
]

export const studioSocialLinks: SocialLink[] = [
  { name: 'LinkedIn', handle: '@pulse41', href: '/contact' },
  { name: 'GitHub', handle: 'pulse41-eng', href: '/services' },
  { name: 'Instagram', handle: '@pulse41.studio', href: '/about' },
  { name: 'Insights', handle: 'Read Notes', href: '/insights' },
]
