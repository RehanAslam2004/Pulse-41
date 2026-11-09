/**
 * Partner & ecosystem showcase cards for the homepage "Proud to have worked with:" section.
 * Styled in Pulse41's Navy, Royal Blue, Sky, and Slate palette.
 */

export type ClientCard = {
  name: string
  category: string
  logoSrc?: string
  /** CSS background for the card (solid colour or gradient). */
  background: string
  /** Use 'light' when the card is dark so the logo/label renders in white. */
  tone: 'light' | 'dark'
  borderColor?: string
}

export const clients: ClientCard[] = [
  {
    name: 'Nintendo',
    category: 'Interactive & Media',
    logoSrc: '/logos/nintendo_logo.svg',
    background: 'linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%)',
    tone: 'dark',
    borderColor: 'rgba(147, 197, 253, 0.5)',
  },
  {
    name: 'Apple Music',
    category: 'Digital Experience',
    logoSrc: '/logos/apple_music_logo.svg',
    background: 'linear-gradient(145deg, #FFFFFF 0%, #F1F5F9 100%)',
    tone: 'dark',
    borderColor: 'rgba(203, 213, 225, 0.8)',
  },
  {
    name: 'Chrome',
    category: 'Web & Cloud Platform',
    logoSrc: '/logos/chrome_logo.svg',
    background: 'linear-gradient(145deg, #E0F2FE 0%, #BAE6FD 100%)',
    tone: 'dark',
    borderColor: 'rgba(125, 211, 252, 0.6)',
  },
  {
    name: 'Prada',
    category: 'Luxury Commerce',
    logoSrc: '/logos/prada_logo.svg',
    background: 'linear-gradient(145deg, #F8FAFC 0%, #E2E8F0 100%)',
    tone: 'dark',
    borderColor: 'rgba(203, 213, 225, 0.8)',
  },
  {
    name: 'Strava',
    category: 'Connected Fitness',
    logoSrc: '/logos/strava_logo.svg',
    background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)',
    tone: 'dark',
    borderColor: 'rgba(165, 180, 252, 0.6)',
  },
  {
    name: 'jQuery',
    category: 'Open Source Ecosystem',
    logoSrc: '/logos/jquery_logo.svg',
    background: 'linear-gradient(145deg, #F0F9FF 0%, #DBEAFE 100%)',
    tone: 'dark',
    borderColor: 'rgba(147, 197, 253, 0.6)',
  },
]
