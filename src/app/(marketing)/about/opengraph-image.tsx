import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'About Pulse41 — Engineering Philosophy & Leadership'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'About Pulse41',
    'Our story, leadership, engineering philosophy, and values powering global digital evolution.'
  )
}
