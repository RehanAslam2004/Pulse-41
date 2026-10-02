'use client'

import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  type?: 'up' | 'left' | 'right' | 'scale' | 'stagger'
  delay?: number
  threshold?: number
}

export function Reveal({ children, className = '', style, type = 'up', delay = 0, threshold = 0.12 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const cls = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
    stagger: 'stagger',
  }[type]

  return (
    <div
      ref={ref}
      className={`${cls}${visible ? ' visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}
