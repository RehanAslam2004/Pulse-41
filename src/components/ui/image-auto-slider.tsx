'use client'

import React from 'react'

export interface ImageAutoSliderProps {
  images?: string[]
  className?: string
  speedSeconds?: number
}

const defaultImages: string[] = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
  'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
]

export function ImageAutoSlider({
  images = defaultImages,
  className = '',
  speedSeconds = 30,
}: ImageAutoSliderProps) {
  // Duplicate images for seamless infinite loop
  const duplicatedImages = [...images, ...images]

  return (
    <div className={`w-full relative overflow-hidden flex items-center justify-center ${className}`}>
      <style>{`
        @keyframes scroll-infinite-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-auto-track {
          display: flex;
          width: max-content;
          animation: scroll-infinite-left ${speedSeconds}s linear infinite;
        }

        .infinite-auto-track:hover {
          animation-play-state: paused;
        }

        .scroll-mask-gradient {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .gallery-card-item {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease, box-shadow 0.35s ease;
        }

        .gallery-card-item:hover {
          transform: scale(1.04) translateY(-4px);
          filter: brightness(1.1);
        }
      `}</style>

      {/* Scrolling images container with gradient edge masks */}
      <div className="relative z-10 w-full flex items-center justify-center py-6 sm:py-8">
        <div className="scroll-mask-gradient w-full">
          <div className="infinite-auto-track flex gap-5 sm:gap-6 w-max pl-4">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="gallery-card-item flex-shrink-0 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900"
              >
                <img
                  src={image}
                  alt={`Gallery aesthetic ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Named alias for compatibility
export const Component = ImageAutoSlider
