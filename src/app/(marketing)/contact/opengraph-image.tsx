import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Get in Touch | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Get in Touch',
    'Start your project, request an architecture review, or explore strategic technology partnerships.'
  )
}
