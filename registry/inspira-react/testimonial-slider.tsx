"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

interface TestimonialSliderProps {
  testimonials?: Testimonial[];
  autoRotate?: boolean;
  duration?: number;
  className?: string;
}

export function TestimonialSlider({
  testimonials = [],
  autoRotate = true,
  duration = 5,
  className,
}: TestimonialSliderProps) {
  const [active, setActive] = useState(0);
  const [autoRotating, setAutoRotating] = useState(autoRotate);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  function heightFix() {
    if (testimonialsRef.current?.parentElement) {
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
    }
  }

  function startAutorotate() {
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = prev + 1 === testimonials.length ? 0 : prev + 1;
        heightFix();
        return next;
      });
    }, duration * 1000);
  }

  function resetAutorotate() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoRotating) startAutorotate();
  }

  function handleSetActive(index: number) {
    setActive(index);
    setAutoRotating(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Restart after manual interaction
    if (autoRotate) {
      setTimeout(() => {
        setAutoRotating(true);
        startAutorotate();
      }, duration * 1000);
    }
  }

  function handleNext() {
    handleSetActive((active + 1) % testimonials.length);
  }

  function handlePrev() {
    handleSetActive((active - 1 + testimonials.length) % testimonials.length);
  }

  useEffect(() => {
    heightFix();
    if (autoRotate) startAutorotate();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <div className={cn("mx-auto w-full max-w-3xl text-center", className)}>
      {/* Testimonial image */}
      <div className="relative h-32">
        <div className="pointer-events-none absolute top-0 left-1/2 size-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-zinc-500/25 before:via-zinc-500/5 before:via-25% before:to-zinc-500/0 before:to-75%">
          <div className="h-32 [mask-image:linear-gradient(0deg,transparent,white_20%,white)]">
            {testimonials.map((testimonial, index) => (
              <div
                key={`image-${index}`}
                className={cn(
                  "absolute inset-0 -z-10 flex h-full flex-col transition-all duration-700",
                  active === index ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
                style={{
                  transform: active === index ? "rotate(0deg)" : "rotate(60deg)",
                  transition: "opacity 700ms cubic-bezier(0.68,-0.3,0.32,1), transform 700ms cubic-bezier(0.68,-0.3,0.32,1)",
                }}
              >
                <img
                  className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                  src={testimonial.img}
                  width={60}
                  height={60}
                  alt={testimonial.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote text */}
      <div className="mb-8 transition-all delay-300 duration-150 ease-in-out">
        <div ref={testimonialsRef} className="relative flex flex-col">
          {testimonials.map((testimonial, index) => (
            <div
              key={`text-${index}`}
              className={cn(
                "w-full transition-all",
                active === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 absolute pointer-events-none",
              )}
              style={{
                transition:
                  active === index
                    ? "opacity 500ms ease-in-out 200ms, transform 500ms ease-in-out 200ms"
                    : "opacity 300ms ease-out 300ms, transform 300ms ease-out 300ms",
              }}
            >
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                &ldquo;{testimonial.quote}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex w-full items-center justify-between gap-4 pt-12 md:pt-0">
        <button
          className="group/button flex size-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          {/* Arrow left */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400"
          >
            <path d="M19 12H5" />
            <path d="m12 5-7 7 7 7" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-1">
          <span className="text-base italic">{current.name}</span>
          <span className="text-sm italic text-muted-foreground">{current.role}</span>
        </div>

        <button
          className="group/button flex size-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          {/* Arrow right */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TestimonialSlider;
