import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pulse41.com'),
  title: {
    template: '%s | Pulse41',
    default: 'Pulse41 — Tech. Think. Thrive.',
  },
  description:
    'Pulse41 is a technology and digital-growth partner combining software engineering, AI, automation, cloud, cybersecurity, data, managed delivery and digital marketing.',
  keywords: [
    'Pulse41', 'technology partner', 'AI solutions', 'software development',
    'digital transformation', 'cloud services', 'cybersecurity',
  ],
  openGraph: {
    title: 'Pulse41 — Tech. Think. Thrive.',
    description:
      'Technology and digital-growth partner combining software engineering, AI, automation, cloud, cybersecurity, data, managed delivery and digital marketing.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Pulse41',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulse41 — Tech. Think. Thrive.',
    description: 'Technology and digital-growth partner for US, EU, UK and international markets.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://iiolrkvwvpekochuclwu.supabase.co" />
      </head>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
