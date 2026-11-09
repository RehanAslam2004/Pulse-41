'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

/**
 * Webphase-style framed hero video:
 * - Sits cleanly below the fixed 72px navbar inside a padded, rounded container.
 * - Preserves the top of the frame (`object-top`) so titles inside the video are never cropped.
 * - Includes clean floating controls for Play/Pause, Stop, Mute/Unmute, and Fullscreen.
 */
export function HeroVideo({ src = '/videos/pulse41-hero.mp4' }: { src?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setIsMuted(true);
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const stopVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <section
      aria-label="Pulse41 introduction film"
      className="relative w-full bg-[#F8FAFC] pt-[84px] pb-4 px-3 sm:px-5 lg:px-7"
    >
      <div
        ref={containerRef}
        onClick={togglePlay}
        className="group relative mx-auto w-full max-w-[1600px] h-[calc(100svh-100px)] min-h-[460px] overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#E8EEF5] border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] cursor-pointer select-none"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-top"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
          <source src="/pulse%2041%20.mp4" type="video/mp4" />
        </video>

        {/* Floating Webphase-style transparent glassmorphic video controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-5 right-5 z-20 flex items-center gap-1 rounded-full bg-black/10 hover:bg-black/25 px-2.5 py-1.5 text-white backdrop-blur-md border border-white/25 shadow-none transition-all duration-300 select-none"
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause' : 'Play'}
            className="flex size-7 sm:size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            {isPlaying ? <Pause className="size-3.5 sm:size-4" /> : <Play className="size-3.5 sm:size-4 fill-white" />}
          </button>

          <button
            type="button"
            onClick={stopVideo}
            aria-label="Stop video"
            title="Stop"
            className="flex size-7 sm:size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <Square className="size-3 sm:size-3.5 fill-white" />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="flex size-7 sm:size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            {isMuted ? <VolumeX className="size-3.5 sm:size-4 text-white/70" /> : <Volume2 className="size-3.5 sm:size-4 text-white" />}
          </button>

          <div className="mx-0.5 h-3.5 w-px bg-white/25" />

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="flex size-7 sm:size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            {isFullscreen ? <Minimize className="size-3.5 sm:size-4" /> : <Maximize className="size-3.5 sm:size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
