import { useState } from 'react'
import { C } from './tokens'

const testimonials = [
  {
    name: 'Michael Chen',
    title: 'Senior Software Engineer, Cloud Infrastructure',
    description: 'Working with Pulse41 completely changed our infrastructure. The support and expertise were incredible — they delivered beyond our expectations and helped us scale to millions of users.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=470&h=470&fit=crop',
  },
  {
    name: 'Jessica Roberts',
    title: 'Lead Data Scientist, InsightX',
    description: 'The analytics platform Pulse41 built gave our team the confidence and tools needed for true data-driven decisions. Their AI integration capabilities went far above our expectations.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=470&h=470&fit=crop',
  },
  {
    name: 'William Carter',
    title: 'VP Product, NovaLabs',
    description: 'Pulse41 helped our products find the perfect market fit. Their engineering team exceeded every delivery milestone and provided exceptional technical leadership throughout the engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=470&h=470&fit=crop',
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (idx: number) => { setCurrent(idx); setAnimKey(k => k + 1) }
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length)
  const next = () => go((current + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Desktop */}
      <div className="p41-desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
        <div style={{ width: 420, height: 420, borderRadius: 20, overflow: 'hidden', flexShrink: 0 }}>
          <img key={animKey + '-img'} src={t.imageUrl} alt={t.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'testimonial-fade 0.45s ease both' }}
          />
        </div>
        <div key={animKey} className="testimonial-enter" style={{
          background: 'white', borderRadius: 20, boxShadow: '0 20px 60px rgba(30,41,59,0.14)',
          padding: '44px 40px', marginLeft: -64, zIndex: 2, flex: 1, border: `1px solid ${C.gray}`,
        }}>
          <div style={{ fontSize: 32, color: C.blue, fontWeight: 800, marginBottom: 20, lineHeight: 1 }}>"</div>
          <p style={{ fontSize: 17, color: C.navy, lineHeight: 1.75, margin: '0 0 28px', fontStyle: 'italic' }}>{t.description}</p>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.navy }}>{t.name}</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{t.title}</div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="p41-mobile-only" style={{ display: 'none', textAlign: 'center' }}>
        <div style={{ width: '100%', aspectRatio: '1', borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
          <img key={animKey + '-m'} src={t.imageUrl} alt={t.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'testimonial-fade 0.45s ease both' }}
          />
        </div>
        <div key={animKey + '-mc'} className="testimonial-enter" style={{ padding: '0 8px' }}>
          <div style={{ fontSize: 28, color: C.blue, fontWeight: 800, marginBottom: 12 }}>"</div>
          <p style={{ fontSize: 15, color: C.navy, lineHeight: 1.75, margin: '0 0 20px', fontStyle: 'italic' }}>{t.description}</p>
          <div style={{ fontWeight: 800, fontSize: 16, color: C.navy }}>{t.name}</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{t.title}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 36 }}>
        <button onClick={prev} style={{
          width: 48, height: 48, borderRadius: '50%', background: 'white',
          border: `1.5px solid ${C.gray}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: '0 2px 8px rgba(30,41,59,0.07)',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.blue }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.gray }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === current ? 24 : 10, height: 10, borderRadius: 5,
              background: i === current ? C.blue : C.gray,
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s, background 0.2s',
            }} />
          ))}
        </div>
        <button onClick={next} style={{
          width: 48, height: 48, borderRadius: '50%', background: 'white',
          border: `1.5px solid ${C.gray}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.2s', boxShadow: '0 2px 8px rgba(30,41,59,0.07)',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.blue }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.gray }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  )
}
