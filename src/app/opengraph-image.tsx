import { ImageResponse } from 'next/og'

export const alt = 'Pulse41 — Tech. Think. Thrive.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1E293B',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
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

        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
          }}
        >
          PULSE41
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#93C5FD',
            fontWeight: 700,
            letterSpacing: '0.16em',
            marginTop: 14,
          }}
        >
          TECH · THINK · THRIVE
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#8DADC8',
            fontWeight: 400,
            marginTop: 28,
            maxWidth: 720,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Technology & Digital Growth Partner for Software Engineering, Applied AI, and Cloud Architecture
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
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
    { ...size }
  )
}
