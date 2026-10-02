import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Careers at Pulse41 — Join Our Engineering Team'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Careers at Pulse41',
    'Join our elite engineering, AI research, and delivery teams building next-generation technology.'
  )
}
