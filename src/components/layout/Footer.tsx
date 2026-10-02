'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { C } from '@/lib/design/tokens'
import { PulseLogo } from '@/components/brand/PulseLogo'

export function Footer() {
  const pathname = usePathname()

  // Do not render marketing footer on administrative portals
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const cols = [
    {
      heading: 'COMPANY',
      items: [
        { label: 'About Pulse41', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Insights & Blog', href: '/insights' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      heading: 'SERVICES',
      items: [
        { label: 'AI & Intelligent Automation', href: '/ai-solutions' },
        { label: 'Software & Product Engineering', href: '/services' },
        { label: 'Cloud & Platform Engineering', href: '/services' },
        { label: 'Cybersecurity & Digital Trust', href: '/services' },
        { label: 'Data & Executive Intelligence', href: '/services' },
        { label: 'Consulting & Assurance', href: '/services' },
      ],
    },
    {
      heading: 'INDUSTRIES',
      items: [
        { label: 'Technology & SaaS', href: '/industries' },
        { label: 'Professional Services', href: '/industries' },
        { label: 'Retail & E-commerce', href: '/industries' },
        { label: 'Education & Training', href: '/industries' },
        { label: 'Healthcare & Care Services', href: '/industries' },
        { label: 'All 10 Industry Sectors', href: '/industries' },
      ],
    },
    {
      heading: 'SOLUTIONS',
      items: [
        { label: 'PulseCore (Digital Presence)', href: '/solutions' },
        { label: 'PulseEngine (Custom Software)', href: '/solutions' },
        { label: 'PulseDesk (Service Operations)', href: '/solutions' },
        { label: 'PulseStore (E-commerce)', href: '/solutions' },
        { label: 'PulseCert (Credentialing)', href: '/solutions' },
        { label: 'All 10 Platform Suites', href: '/solutions' },
      ],
    },
  ]

  return (
    <footer style={{ background: C.navy, borderTop: '1px solid rgba(203,213,225,0.06)', padding: '72px 32px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 60 }}
          className="p41-footer-grid"
        >
          {/* Brand col */}
          <div>
            <Link href="/" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 20, display: 'inline-block', textDecoration: 'none' }}>
              <PulseLogo height={20} dark={true} />
            </Link>
            <p style={{ fontSize: 14, color: '#8DADC8', lineHeight: 1.72, maxWidth: 280, margin: '0 0 18px' }}>
              AI-powered products, digital experiences and technology solutions that help organizations move from complexity to measurable progress.
            </p>
            <div style={{ fontSize: 12, color: '#93C5FD', marginBottom: 16 }}>
              HQ: Pakistan + Remote <span style={{ opacity: 0.5 }}>|</span> Serving US, EU, UK & Global
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#64748B', textTransform: 'uppercase' }}>
              TECH. THINK. THRIVE.
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: C.lightBlue, textTransform: 'uppercase', marginBottom: 20 }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    style={{
                      textDecoration: 'none',
                      fontSize: 14,
                      color: '#8DADC8',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      transition: 'color 0.2s',
                      padding: 0,
                    }}
                    className="hover:text-blue-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(203,213,225,0.07)',
            padding: '24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 13, color: '#64748B' }}>© 2026 Pulse41. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Security & Trust', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ fontSize: 13, color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
                className="hover:text-blue-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              style={{ fontSize: 13, color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
              className="hover:text-blue-400"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .p41-footer-grid { grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr !important; }
        @media (max-width: 900px) { .p41-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .p41-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
