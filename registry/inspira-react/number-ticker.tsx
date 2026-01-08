"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

// Easing functions matching @vueuse/core TransitionPresets
const easings: Record<string, (t: number) => number> = {
  linear: (t) => t,
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

interface NumberTickerProps {
  value?: number;
  direction?: "up" | "down";
  duration?: number;
  delay?: number;
  decimalPlaces?: number;
  className?: string;
  transition?: keyof typeof easings;
}

export function NumberTicker({
  value = 0,
  direction = "up",
  duration = 1000,
  delay = 0,
  decimalPlaces = 2,
  className,
  transition = "easeOutCubic",
}: NumberTickerProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(
    direction === "down" ? value : 0,
  );
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const animationRef = useRef<number | null>(null);

  function animateTo(from: number, to: number) {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const easeFn = easings[transition] ?? easings.easeOutCubic;
    const startTime = performance.now() + delay;

    function step(now: number) {
      if (now < startTime) {
        animationRef.current = requestAnimationFrame(step);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeFn(progress);
      const current = from + (to - from) * eased;
      setDisplayValue(current);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    }

    animationRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
          const start = direction === "down" ? value : 0;
          const end = direction === "down" ? 0 : value;
          animateTo(start, end);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasBeenInView) {
      const current = displayValue;
      const end = direction === "down" ? 0 : value;
      animateTo(current, end);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(displayValue.toFixed(decimalPlaces)));

  return (
    <span
      ref={spanRef}
      className={cn(
        "inline-block tracking-wider text-black tabular-nums dark:text-white",
        className,
      )}
    >
      {formatted}
    </span>
  );
}
