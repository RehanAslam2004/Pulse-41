'use client'

import React, { useState } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  X,
  RotateCw,
  Eye,
} from 'lucide-react'

type DeviceType = 'desktop' | 'tablet' | 'mobile'

interface DevicePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  previewUrl: string
  title: string
}

export function DevicePreviewModal({
  isOpen,
  onClose,
  previewUrl,
  title,
}: DevicePreviewModalProps) {
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [key, setKey] = useState(0)

  if (!isOpen) return null

  const getWidth = () => {
    switch (device) {
      case 'desktop':
        return 'w-full max-w-5xl'
      case 'tablet':
        return 'w-[768px]'
      case 'mobile':
        return 'w-[375px]'
    }
  }

  const getHeight = () => {
    switch (device) {
      case 'desktop':
        return 'h-[680px]'
      case 'tablet':
        return 'h-[720px]'
      case 'mobile':
        return 'h-[667px]'
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700/80 flex flex-col h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview Control Bar */}
        <div className="h-14 px-6 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-3">
            <span className="font-bold flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Live CMS Preview</span>
            </span>
            <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">
              {title}
            </span>
          </div>

          {/* Device Toggles */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                device === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop 1440px"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                device === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet 768px"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                device === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile 375px"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setKey((k) => k + 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 cursor-pointer"
              title="Reload Frame"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Frame Stage */}
        <div className="flex-1 overflow-auto bg-slate-950 flex items-center justify-center p-6">
          <div
            className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-white ${getWidth()} ${getHeight()}`}
          >
            <iframe
              key={key}
              src={previewUrl}
              className="w-full h-full border-0"
              title="Public Draft Preview"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
