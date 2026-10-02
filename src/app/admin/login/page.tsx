'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PulseLogo } from '@/components/brand/PulseLogo'
import { SignInPage, type Testimonial } from '@/components/ui/sign-in'

const clientTestimonials: Testimonial[] = [
  {
    avatarSrc:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    name: 'Sarah Chen',
    handle: 'VP Engineering · OmniRetail Group',
    text: 'Pulse41 transformed our core architecture. Zero downtime, robust telemetry, and complete operational visibility.',
  },
  {
    avatarSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    name: 'Marcus Vance',
    handle: 'Chief Technology Officer · FinTrust',
    text: 'The executive command console and zero-trust security parameters give our audit committee complete governance confidence.',
  },
]

export default function AdminLoginPage() {
  const router = useRouter()
  const [nextUrl, setNextUrl] = useState('/admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const next = params.get('next')
      if (next) setNextUrl(next)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please check credentials.')
      }

      // Successful login
      router.push(nextUrl)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during sign in.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = () => {
    setError('Password resets for administrative accounts require multi-factor verification by Pulse41 SecOps. Please contact sysadmin@pulse41.com.')
  }

  return (
    <SignInPage
      logo={
        <Link href="/" className="inline-block transition-opacity hover:opacity-85">
          <PulseLogo height={22} />
        </Link>
      }
      title={
        <span className="font-extrabold text-slate-900 tracking-tight">
          Executive Console
        </span>
      }
      description="Authorized administrative access for Pulse41 systems and governance."
      error={error}
      loading={loading}
      emailValue={email}
      passwordValue={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSignIn={handleSubmit}
      onResetPassword={handleResetPassword}
      heroImageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=85"
      testimonials={clientTestimonials}
      backLink={
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Pulse41</span>
        </Link>
      }
    />
  )
}
