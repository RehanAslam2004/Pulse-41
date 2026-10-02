import { C, type Page } from './tokens'
import { PulseLogo } from './PulseLogo'

interface Props { navigate: (p: Page) => void }

export function Footer({ navigate }: Props) {
  const go = (p: Page) => { navigate(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const cols = [
    {
      heading: 'COMPANY',
      items: [
        { label: 'About', page: 'about' as Page },
        { label: 'Careers', page: 'careers' as Page },
        { label: 'Insights', page: 'insights' as Page },
        { label: 'Contact', page: 'contact' as Page },
      ],
    },
    {
      heading: 'SERVICES',
      items: [
        { label: 'AI & Automation', page: 'ai-solutions' as Page },
        { label: 'Digital Transformation', page: 'services' as Page },
        { label: 'Software & Web', page: 'services' as Page },
        { label: 'Data & Analytics', page: 'services' as Page },
        { label: 'Digital Marketing', page: 'services' as Page },
        { label: 'Consultancy', page: 'services' as Page },
      ],
    },
    {
      heading: 'INDUSTRIES',
      items: [
        { label: 'Healthcare', page: 'industries' as Page },
        { label: 'Education', page: 'industries' as Page },
        { label: 'Finance', page: 'industries' as Page },
        { label: 'Retail', page: 'industries' as Page },
        { label: 'Government', page: 'industries' as Page },
        { label: 'SMEs & Startups', page: 'industries' as Page },
      ],
    },
    {
      heading: 'CONNECT',
      items: [
        { label: 'LinkedIn', page: 'contact' as Page },
        { label: 'Facebook', page: 'contact' as Page },
        { label: 'Instagram', page: 'contact' as Page },
        { label: 'Email', page: 'contact' as Page },
      ],
    },
  ]

  return (
    <footer style={{ background: C.navy, borderTop: `1px solid rgba(203,213,225,0.06)`, padding: '72px 32px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 60 }}
          className="p41-footer-grid">
          {/* Brand col */}
          <div>
            <button onClick={() => go('home')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, marginBottom:20, display:'block' }}>
              <PulseLogo height={20} dark={true} />
            </button>
            <p style={{ fontSize: 14, color: '#8DADC8', lineHeight: 1.72, maxWidth: 280, margin: '0 0 24px' }}>
              AI-powered products, digital experiences and technology solutions
              that help organizations move from complexity to measurable progress.
            </p>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#64748B', textTransform: 'uppercase' }}>
              TECH · THINK · THRIVE
            </div>
          </div>

          {cols.map(col => (
            <div key={col.heading}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: C.lightBlue, textTransform: 'uppercase', marginBottom: 20 }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map((item, i) => (
                  <button key={i} onClick={() => go(item.page)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    fontSize: 14, color: '#8DADC8', fontFamily: 'Inter', transition: 'color 0.2s', padding: 0,
                  }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = C.lightBlue)}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#8DADC8')}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: `1px solid rgba(203,213,225,0.07)`, padding: '24px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{ fontSize: 13, color: '#64748B' }}>© 2026 Pulse41. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms & Conditions', href: '/terms' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: 13, color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.lightBlue)}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#64748B')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .p41-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr 1fr !important; }
        @media (max-width: 900px) { .p41-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .p41-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
