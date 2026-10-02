import { useState, useEffect } from 'react'
import { C, type Page } from './tokens'
import { PulseLogo } from './PulseLogo'

interface Props { current: Page; navigate: (p: Page) => void }

const centerLinks: { label: string; page: Page }[] = [
  { label: 'Services',     page: 'services' },
  { label: 'AI Solutions', page: 'ai-solutions' },
  { label: 'Industries',   page: 'industries' },
  { label: 'Solutions',    page: 'solutions' },
  { label: 'Case Studies', page: 'case-studies' },
  { label: 'Insights',     page: 'insights' },
]

const allLinks: { label: string; page: Page }[] = [
  { label: 'Home',         page: 'home' },
  { label: 'About',        page: 'about' },
  ...centerLinks,
  { label: 'Pricing',      page: 'pricing' },
  { label: 'Careers',      page: 'careers' },
  { label: 'Contact',      page: 'contact' },
]

export function Navbar({ current, navigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (p: Page) => { navigate(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        background: scrolled ? 'rgba(248,250,252,0.97)' : '#FFFFFF',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(203,213,225,0.8)' : 'rgba(203,213,225,0.5)'}`,
        boxShadow: scrolled ? '0 1px 12px rgba(30,41,59,0.06)' : 'none',
        transition: 'box-shadow 0.25s, border-color 0.25s, background 0.25s',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 40px',
          height: 64,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 0,
        }}>
          {/* Logo */}
          <button
            onClick={() => go('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', marginRight: 40 }}
          >
            <PulseLogo height={18} />
          </button>

          {/* Center links */}
          <div className="p41-nav-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            {centerLinks.map(l => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: current === l.page ? 700 : 500,
                  color: current === l.page ? C.navy : '#64748B',
                  padding: '0 12px',
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  borderBottom: current === l.page ? `2px solid ${C.blue}` : '2px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { if (current !== l.page) (e.currentTarget as HTMLElement).style.color = C.navy }}
                onMouseLeave={e => { if (current !== l.page) (e.currentTarget as HTMLElement).style.color = '#64748B' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="p41-nav-right" style={{ display: 'flex', alignItems: 'center', gap: 0, marginLeft: 24 }}>
            <button
              onClick={() => go('pricing')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                fontWeight: current === 'pricing' ? 700 : 500,
                color: current === 'pricing' ? C.navy : '#64748B',
                padding: '0 12px', height: 64,
                display: 'flex', alignItems: 'center', whiteSpace: 'nowrap',
                borderBottom: current === 'pricing' ? `2px solid ${C.blue}` : '2px solid transparent',
                transition: 'color 0.15s',
              }}
            >Pricing</button>
            <button
              onClick={() => go('careers')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                fontWeight: current === 'careers' ? 700 : 500,
                color: current === 'careers' ? C.navy : '#64748B',
                padding: '0 12px', height: 64,
                display: 'flex', alignItems: 'center', whiteSpace: 'nowrap',
                borderBottom: current === 'careers' ? `2px solid ${C.blue}` : '2px solid transparent',
                transition: 'color 0.15s',
              }}
            >Careers</button>
            <div style={{ width: 1, height: 20, background: '#E2E8F0', margin: '0 12px' }} />
            <button
              onClick={() => go('contact')}
              style={{
                background: C.blue, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                color: 'white', padding: '0 18px', height: 36, borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                transition: 'background 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.blue; (e.currentTarget as HTMLElement).style.transform = 'none' }}
            >
              Get a Quote <span style={{ fontSize: 12 }}>→</span>
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="p41-hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none', gridColumn: 3 }}
          >
            <div style={{ width: 20, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ display: 'block', height: 2, background: C.navy, borderRadius: 2, transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none', transition: 'transform 0.2s' }} />
              <span style={{ display: 'block', height: 2, background: C.navy, borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
              <span style={{ display: 'block', height: 2, background: C.navy, borderRadius: 2, transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'white',
          paddingTop: 72,
          overflowY: 'auto',
          animation: 'page-in 0.2s ease',
        }}>
          <div style={{ padding: '0 24px 48px' }}>
            {allLinks.map(l => (
              <button key={l.page} onClick={() => go(l.page)} style={{
                width: '100%', textAlign: 'left', background: 'none', border: 'none',
                fontSize: 16, fontWeight: current === l.page ? 700 : 500,
                color: current === l.page ? C.blue : C.navy,
                padding: '15px 0',
                borderBottom: `1px solid ${C.gray}`,
                cursor: 'pointer', fontFamily: 'Inter',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {l.label}
                <span style={{ color: C.blue, opacity: current === l.page ? 1 : 0.3, fontSize: 14 }}>→</span>
              </button>
            ))}
            <button onClick={() => go('contact')} style={{
              marginTop: 24, width: '100%', background: C.blue, border: 'none',
              borderRadius: 10, padding: '14px', color: 'white', fontSize: 15,
              fontWeight: 700, fontFamily: 'Inter', cursor: 'pointer',
            }}>
              Get a Quote →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .p41-nav-center { display: none !important; }
          .p41-nav-right  { display: none !important; }
          .p41-hamburger  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
