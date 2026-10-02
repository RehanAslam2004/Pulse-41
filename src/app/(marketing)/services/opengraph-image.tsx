import { createOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Services & Practice Portfolio | Pulse41'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage(
    'Services & Practice Portfolio',
    'End-to-end software engineering, cloud architecture, cybersecurity, and data intelligence.'
  )
}
