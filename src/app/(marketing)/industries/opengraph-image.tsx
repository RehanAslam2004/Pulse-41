import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Industries We Serve | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Industries We Serve',
    'Domain-tailored technology solutions for SaaS, FinTech, Healthcare, E-commerce, and more.'
  )
}
