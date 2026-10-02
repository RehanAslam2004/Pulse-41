'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, ShieldAlert, Loader2 } from 'lucide-react'

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string
  name: string
  handle: string
  text: string
}

export interface SignInPageProps {
  logo?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  error?: string | null
  loading?: boolean
  emailValue?: string
  passwordValue?: string
  onEmailChange?: (val: string) => void
  onPasswordChange?: (val: string) => void
  heroImageSrc?: string
  testimonials?: Testimonial[]
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void
  onGoogleSignIn?: () => void
  onResetPassword?: () => void
  backLink?: React.ReactNode
  showSocial?: boolean
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 shadow-xs">
    {children}
  </div>
)

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial; delay: string }) => (
  <div
    className={`animate-testimonial ${delay} flex items-start gap-3 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/50 dark:border-white/10 p-4 shadow-xl max-w-xs`}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-xl flex-shrink-0" alt={testimonial.name} />
    <div className="text-xs leading-snug">
      <p className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">{testimonial.name}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{testimonial.handle}</p>
      <p className="mt-1 text-slate-700 dark:text-slate-200 line-clamp-3">{testimonial.text}</p>
    </div>
  </div>
)

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
  logo,
  title = <span className="font-bold text-slate-900 tracking-tight">Welcome</span>,
  description = 'Access your account and continue your journey with us',
  error,
  loading = false,
  emailValue = '',
  passwordValue = '',
  onEmailChange,
  onPasswordChange,
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onResetPassword,
  backLink,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  return (
    <div className="min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-white text-slate-900 font-sans relative overflow-x-hidden md:overflow-hidden">
      {/* Left column: sign-in form */}
      <section className="w-full md:w-1/2 lg:w-5/12 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top bar with Logo & Back Link */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto mb-4 animate-element">
          <div>
            {logo}
          </div>
          {backLink && (
            <div>
              {backLink}
            </div>
          )}
        </div>

        {/* Central Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-2">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="animate-element animate-delay-100 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {title}
              </h1>
              <p className="animate-element animate-delay-200 text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="animate-element p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={onSignIn}>
              <div className="animate-element animate-delay-300">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Email Address
                </label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => onEmailChange?.(e.target.value)}
                    placeholder="Enter your corporate email address"
                    className="w-full bg-transparent text-sm p-3.5 rounded-2xl focus:outline-none text-slate-900 placeholder-slate-400"
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Password
                </label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordValue}
                      onChange={(e) => onPasswordChange?.(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm p-3.5 pr-12 rounded-2xl focus:outline-none text-slate-900 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500 flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>Keep me signed in</span>
                </label>

                {onResetPassword && (
                  <button
                    type="button"
                    onClick={onResetPassword}
                    className="hover:underline text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Reset password
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="animate-element animate-delay-600 w-full rounded-2xl bg-slate-950 hover:bg-slate-800 text-white py-3.5 font-bold text-sm transition-all duration-200 shadow-lg shadow-slate-950/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Security note */}
            <div className="animate-element animate-delay-700 text-center pt-2">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-2 font-medium">
                <span>256-Bit SSL</span>
                <span>•</span>
                <span>Role-Based Access</span>
                <span>•</span>
                <span>Zero-Trust Security</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom subtle copyright / branding note */}
        <div className="w-full max-w-md mx-auto text-center pt-2">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Pulse41. Restricted System.
          </p>
        </div>
      </section>

      {/* Right column: hero image + floating testimonials */}
      {heroImageSrc && (
        <section className="hidden md:flex md:w-1/2 lg:w-7/12 p-4 lg:p-6 h-full flex-col">
          <div
            className="animate-slide-right animate-delay-300 w-full h-full rounded-3xl bg-cover bg-center relative overflow-hidden shadow-2xl flex flex-col justify-end p-8 lg:p-10"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          >
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/10" />

            {/* Testimonials at bottom */}
            {testimonials.length > 0 && (
              <div className="relative z-10 flex flex-col xl:flex-row gap-3 justify-end items-end w-full">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className={`w-full max-w-xs transition-all ${
                      idx > 0 ? 'hidden xl:block' : ''
                    }`}
                  >
                    <TestimonialCard
                      testimonial={t}
                      delay={`animate-delay-${800 + idx * 200}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default SignInPage
