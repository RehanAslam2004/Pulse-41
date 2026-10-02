import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Pricing & Engagement Models | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Pricing & Engagement Models',
    'Transparent investment tiers, dedicated engineering pods, and enterprise transformation solutions.'
  )
}
