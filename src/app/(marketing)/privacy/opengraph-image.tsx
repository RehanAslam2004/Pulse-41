import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Privacy Policy | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Privacy Policy',
    'How Pulse41 collects, manages, and safeguards client data, intellectual property, and visitor information.'
  )
}
