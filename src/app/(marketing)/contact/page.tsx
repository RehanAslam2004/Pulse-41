import type { Metadata } from 'next'
import { ContactPageClient } from '@/components/pages/ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us & Project Discovery',
  description:
    'Start a conversation with Pulse41 technical leadership. Discuss your software engineering, applied AI, or platform modernization project.',
  openGraph: {
    title: 'Contact Us & Project Discovery | Pulse41',
    description:
      'Reach out to Pulse41 for a complimentary architecture discovery session and transparent proposal within 24 hours.',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
