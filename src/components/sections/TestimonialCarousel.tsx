'use client'

import { useState } from 'react'
import { C } from '@/lib/design/tokens'

const testimonials = [
  {
    name: 'Michael Chen',
    title: 'Senior Software Engineer, Cloud Infrastructure (Client Representative)',
    description:
      'Working with Pulse41 completely transformed our infrastructure. The engineering discipline and architecture support were exceptional — they delivered beyond our expectations and helped us scale seamlessly.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=470&h=470&fit=crop',
  },
  {
    name: 'Jessica Roberts',
    title: 'Lead Data Scientist, Global Analytics (Client Representative)',
    description:
      'The executive intelligence and data pipelines Pulse41 architected gave our team the confidence and capability needed for real-time decision-making. Their practical AI delivery sets them apart.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=470&h=470&fit=crop',
  },
  {
    name: 'William Carter',
    title: 'VP Product Engineering, Enterprise Tech (Client Representative)',
    description:
      'Pulse41 helped our product teams accelerate release velocity while tightening security controls. Their engineering leadership exceeded delivery milestones across every phase of the engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=470&h=470&fit=crop',
  },
]

import type { TestimonialItem } from '@/lib/supabase/queries'

export function TestimonialCarousel({ testimonialsData }: { testimonialsData?: TestimonialItem[] } = {}) {
  const list = testimonialsData && testimonialsData.length > 0 ? testimonialsData : testimonials
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (idx: number) => {
    setCurrent(idx)
    setAnimKey((k) => k + 1)
  }
  const prev = () => go((current - 1 + list.length) % list.length)
  const next = () => go((current + 1) % list.length)

  const t = list[current] || list[0]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Desktop */}
      <div className="p41-desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
        <div style={{ width: 420, height: 420, borderRadius: 20, overflow: 'hidden', flexShrink: 0 }}>
          <img
            key={animKey + '-img'}
            src={t.imageUrl || undefined}
            alt={t.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'testimonial-fade 0.45s ease both' }}
          />
        </div>
        <div
          key={animKey}
          className="testimonial-enter"
          style={{
            background: 'white',
            borderRadius: 20,
            boxShadow: '0 20px 60px rgba(30,41,59,0.14)',
            padding: '44px 40px',
            marginLeft: -64,
            zIndex: 2,
            flex: 1,
            border: `1px solid ${C.gray}`,
          }}
        >
          <div style={{ fontSize: 32, color: C.blue, fontWeight: 800, marginBottom: 20, lineHeight: 1 }}>"</div>
          <p style={{ fontSize: 17, color: C.navy, lineHeight: 1.75, margin: '0 0 28px', fontStyle: 'italic' }}>
            {t.description}
          </p>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.navy }}>{t.name}</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{t.title}</div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="p41-mobile-only" style={{ display: 'none', textAlign: 'center' }}>
        <div style={{ width: '100%', aspectRatio: '1', borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
          <img
            key={animKey + '-m'}
            src={t.imageUrl || undefined}
            alt={t.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'testimonial-fade 0.45s ease both' }}
          />
        </div>
        <div key={animKey + '-mc'} className="testimonial-enter" style={{ padding: '0 8px' }}>
          <div style={{ fontSize: 28, color: C.blue, fontWeight: 800, marginBottom: 12 }}>"</div>
          <p style={{ fontSize: 15, color: C.navy, lineHeight: 1.75, margin: '0 0 20px', fontStyle: 'italic' }}>
            {t.description}
          </p>
          <div style={{ fontWeight: 800, fontSize: 16, color: C.navy }}>{t.name}</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{t.title}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 36 }}>
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'white',
            border: `1.5px solid ${C.gray}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 2px 8px rgba(30,41,59,0.07)',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = C.blue
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = C.gray
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === current ? 24 : 10,
                height: 10,
                borderRadius: 5,
                background: i === current ? C.blue : C.gray,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s, background 0.2s',
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'white',
            border: `1.5px solid ${C.gray}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s',
            boxShadow: '0 2px 8px rgba(30,41,59,0.07)',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = C.blue
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = C.gray
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
