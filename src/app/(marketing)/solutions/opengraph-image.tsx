import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Solutions & Frameworks | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Solutions & Frameworks',
    'Production-ready platforms: PulseCore, PulseEngine, PulseDesk, PulseStore, and PulseCert.'
  )
}
