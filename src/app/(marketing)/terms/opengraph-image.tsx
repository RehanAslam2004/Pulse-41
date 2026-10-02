import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Terms & Conditions | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Terms & Conditions',
    'Terms governing Pulse41 software engineering engagements, platform delivery, and enterprise consulting agreements.'
  )
}
