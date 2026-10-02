import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Client Success & Case Studies | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Client Success & Case Studies',
    'Real-world engineering, cloud migrations, and AI implementations delivering measurable impact.'
  )
}
