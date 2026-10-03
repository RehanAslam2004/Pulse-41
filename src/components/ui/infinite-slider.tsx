'use client';

import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);

  useEffect(() => {
    const rawSize = direction === 'horizontal' ? width : height;
    if (!rawSize || rawSize <= 0) return;

    // The motion div contains 2 duplicate sets of children.
    // Seamless loop distance is exactly half the total measured size plus half gap.
    const contentSize = rawSize + gap;
    const targetDistance = contentSize / 2;
    const from = reverse ? -targetDistance : 0;
    const to = reverse ? 0 : -targetDistance;

    const currentPos = translation.get();
    const remainingDistance = Math.abs(currentPos - to);
    const initialDuration = Math.max(0.1, currentDuration * (remainingDistance / targetDistance));

    let activeLoop: { stop: () => void } | undefined;

    // Start smoothly from current position to 'to'
    const initialAnim = animate(translation, [currentPos, to], {
      ease: 'linear',
      duration: initialDuration,
      onComplete: () => {
        translation.set(from);
        activeLoop = animate(translation, [from, to], {
          ease: 'linear',
          duration: currentDuration,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
          onRepeat: () => {
            translation.set(from);
          },
        });
      },
    });

    return () => {
      initialAnim.stop();
      activeLoop?.stop();
    };
  }, [
    currentDuration,
    width,
    height,
    gap,
    direction,
    reverse,
    translation,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => setCurrentDuration(durationOnHover),
        onHoverEnd: () => setCurrentDuration(duration),
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
