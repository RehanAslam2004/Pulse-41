import type { Metadata } from 'next'
import { AboutPageClient } from '@/components/pages/AboutPageClient'

export const metadata: Metadata = {
  title: 'About Pulse41',
  description:
    'Learn about Pulse41 — a technology and digital-growth partner combining software engineering, applied AI, platform architecture and disciplined delivery.',
  openGraph: {
    title: 'About Pulse41 | Tech. Think. Thrive.',
    description:
      'Pulse41 converts complex business challenges into secure digital products, intelligent workflows and scalable platforms.',
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
