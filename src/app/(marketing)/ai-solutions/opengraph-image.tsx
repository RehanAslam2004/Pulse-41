import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Applied AI & Intelligent Systems | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Applied AI & Intelligent Systems',
    'Enterprise LLMs, agentic workflows, automation, and predictive intelligence delivered responsibly.'
  )
}
