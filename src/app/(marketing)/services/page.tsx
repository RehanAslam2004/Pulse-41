import type { Metadata } from 'next'
import { ServicesPageClient } from '@/components/pages/ServicesPageClient'
import { getServices } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Services & Practice Portfolio',
  description:
    'Explore Pulse41 eight major technology practices: AI & automation, software engineering, cloud platform, cybersecurity, data intelligence and managed delivery.',
  openGraph: {
    title: 'Services & Practice Portfolio | Pulse41',
    description:
      'Eight integrated technology practices engineered to deliver dependable digital transformation and measurable business growth.',
  },
}

export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesPageClient servicesData={services} />
}
