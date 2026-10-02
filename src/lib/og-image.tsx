import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export function createOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: '#1E293B',
          position: 'relative',
        }}
      >
        {/* Top accent gradient bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #3B82F6, #93C5FD)',
          }}
        />

        {/* Brand header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#93C5FD',
              letterSpacing: '0.14em',
            }}
          >
            PULSE41
          </div>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              marginLeft: 14,
              marginRight: 14,
            }}
          />
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#64748B',
              letterSpacing: '0.16em',
            }}
          >
            TECH · THINK · THRIVE
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: 24,
              color: '#8DADC8',
              marginTop: 20,
              lineHeight: 1.5,
              maxWidth: 880,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Bottom domain badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            fontSize: 15,
            color: '#64748B',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          pulse41.com
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
