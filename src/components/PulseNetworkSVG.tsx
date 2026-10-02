import { C } from './tokens'

interface Props { size?: 'sm' | 'md' | 'lg'; dark?: boolean }

export function PulseNetworkSVG({ size = 'md', dark = true }: Props) {
  const nodes = [
    { id: 'ai',     x: 200, y: 52,  label: 'AI',          primary: true },
    { id: 'data',   x: 68,  y: 152, label: 'DATA',        primary: false },
    { id: 'auto',   x: 200, y: 152, label: 'AUTO',        primary: false },
    { id: 'sw',     x: 332, y: 152, label: 'SOFTWARE',    primary: false },
    { id: 'dx',     x: 118, y: 258, label: 'DIGITAL EXP', primary: false },
    { id: 'biz',    x: 282, y: 258, label: 'BUSINESS',    primary: false },
    { id: 'result', x: 200, y: 348, label: 'RESULTS',     primary: true },
  ]
  const edges: [string, string][] = [
    ['ai','data'],['ai','auto'],['ai','sw'],
    ['data','dx'],['auto','dx'],['auto','biz'],['sw','biz'],
    ['dx','result'],['biz','result'],
  ]
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  const maxW = size === 'sm' ? 280 : size === 'lg' ? 460 : 380

  return (
    <div style={{
      background: dark ? C.navy : 'white',
      borderRadius: 20, padding: '28px 24px', position: 'relative', overflow: 'hidden',
      border: dark ? 'none' : `1px solid ${C.gray}`,
      backgroundImage: 'radial-gradient(rgba(147,197,253,0.12) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }}>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: C.lightBlue, marginBottom: 12, textTransform: 'uppercase' }}>
          PULSE41 INTELLIGENCE SYSTEM
        </div>
        <svg viewBox="0 0 400 410" width="100%" style={{ display: 'block', maxWidth: maxW }} xmlns="http://www.w3.org/2000/svg">
          {edges.map(([a, b], i) => {
            const na = nodeMap[a], nb = nodeMap[b]
            return (
              <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={C.lightBlue} strokeWidth="1" strokeDasharray="6 4" opacity="0.3"
                style={{ animation: `signal-flow ${2 + i * 0.35}s ease-in-out infinite`, strokeDashoffset: 120 }}
              />
            )
          })}
          {nodes.filter(n => n.primary).map(n => (
            <circle key={n.id + '-ring'} cx={n.x} cy={n.y} r={20}
              fill="none" stroke={C.blue} strokeWidth="1.5" opacity="0.35"
              style={{ animation: 'pulse-ring 2.5s ease-out infinite', transformOrigin: `${n.x}px ${n.y}px` }}
            />
          ))}
          {nodes.map(n => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={n.primary ? 12 : 7}
                fill={n.primary ? C.blue : '#253347'}
                stroke={n.primary ? C.lightBlue : C.blue}
                strokeWidth={n.primary ? 2 : 1.5}
                style={{ animation: `pulse-node ${1.6 + (n.id.charCodeAt(0) % 5) * 0.35}s ease-in-out infinite` }}
              />
              <text x={n.x} y={n.y + (n.primary ? 28 : 23)} textAnchor="middle"
                fill={n.primary ? C.lightBlue : '#7BA3C0'}
                fontSize={n.primary ? 9 : 8}
                fontFamily="Inter, sans-serif"
                fontWeight={n.primary ? 700 : 500}
                letterSpacing="0.08em"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
        <div style={{ display: 'flex', gap: 20, marginTop: 16, borderTop: `1px solid rgba(147,197,253,0.1)`, paddingTop: 14 }}>
          {['AI Automation', 'Data Intelligence', 'Software Eng.'].map(tag => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue, flexShrink: 0, animation: 'pulse-node 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, color: '#7BA3C0', fontWeight: 500 }}>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
