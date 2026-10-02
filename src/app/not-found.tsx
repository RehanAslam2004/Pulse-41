import Link from 'next/link'
import { C } from '@/lib/design/tokens'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.navy,
        color: 'white',
        padding: '120px 32px 80px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.lightBlue, letterSpacing: '0.18em', marginBottom: 16 }}>
          ERROR 404
        </div>
        <h1
          style={{
            fontSize: 'clamp(40px,5vw,72px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}
        >
          PAGE NOT FOUND.
        </h1>
        <p style={{ fontSize: 17, color: '#8DADC8', lineHeight: 1.7, margin: '0 auto 36px' }}>
          The link you followed may be incorrect, or the page may have been moved or updated.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            Return Home <span className="arrow">→</span>
          </Link>
          <Link href="/services" className="btn-ghost" style={{ textDecoration: 'none' }}>
            Explore Services <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
