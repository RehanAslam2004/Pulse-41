import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Insights & Engineering Blog | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Insights & Engineering Blog',
    'Architectural guides, AI research, technology trends, and engineering best practices.'
  )
}
