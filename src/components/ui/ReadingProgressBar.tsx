'use client'

import { useEffect, useState } from 'react'

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (totalHeight <= 0) {
        setProgress(0)
        return
      }
      const currentScroll = window.scrollY
      const pct = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100))
      setProgress(pct)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (progress <= 0) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(59,130,246,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
