'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

export function VideoShowcaseSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {
        // Fallback for browser autoplay policies
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const targetPercent = clickX / width;
    const newTime = targetPercent * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(targetPercent * 100);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Ambient muted autoplay preview when entering viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              // Policy restricted
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  return (
    <section className="relative w-full bg-[#F8FAFC] py-20 sm:py-28 overflow-hidden border-t border-b border-slate-200/80">
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              DISCIPLINED ENGINEERING{' '}
              <span className="text-blue-600">IN MOTION.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Explore how Pulse41 architects high-velocity software platforms, autonomous AI workflows, and resilient cloud systems with verified enterprise rigor.
            </p>
          </Reveal>
        </div>

        {/* Video Showcase Card */}
        <Reveal delay={0.2}>
          <div
            ref={containerRef}
            className="group relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-slate-200/80 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] transition-all duration-500 hover:shadow-[0_30px_70px_-10px_rgba(37,99,235,0.22)] cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => {
              if (isPlaying) setShowControls(false);
            }}
            onClick={togglePlay}
          >
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src="/pulse%2041%20.mp4"
              className="w-full h-full object-cover"
              playsInline
              loop
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/pulse%2041%20.mp4" type="video/mp4" />
              <source src="/pulse-41-intro.mp4" type="video/mp4" />
            </video>

            {/* Central Play Overlay Icon when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-[2px]">
                <div className="size-20 sm:size-24 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)] border border-white/20 transform transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-8 sm:size-10 ml-1 text-white fill-white" />
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div
              className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrub Progress Bar */}
              <div
                className="relative w-full h-1.5 sm:h-2 bg-white/20 rounded-full cursor-pointer mb-4 overflow-hidden"
                onClick={handleSeek}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Action Buttons & Timestamps */}
              <div className="flex items-center justify-between text-white text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="size-5 text-slate-400" /> : <Volume2 className="size-5 text-white" />}
                  </button>

                  <span className="font-mono text-xs text-slate-300">
                    {currentTime} / {duration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize className="size-4 sm:size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
