"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface DesignTestimonialsProps {
  title?: string;
  duration?: number;
  testimonials: TestimonialItem[];
  className?: string;
}

export function DesignTestimonials({
  title = "Testimonials",
  testimonials,
  duration = 6000,
  className,
}: DesignTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for magnetic / parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  function goNext() {
    setActiveIndex((i) => (i + 1) % testimonials.length);
  }
  function goPrev() {
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  useEffect(() => {
    const timer = setInterval(goNext, duration);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, testimonials.length]);

  const current = testimonials[activeIndex];
  const paddedIndex = String(activeIndex + 1).padStart(2, "0");
  const progressHeight = `${((activeIndex + 1) / testimonials.length) * 100}%`;

  return (
    <div className={cn("bg-background flex min-h-screen items-center justify-center overflow-hidden", className)}>
      <div ref={containerRef} className="relative w-full max-w-5xl" onMouseMove={handleMouseMove}>
        {/* Oversized index number */}
        <motion.div
          className="text-foreground/[0.06] pointer-events-none absolute top-1/2 -left-8 z-0 -translate-y-1/2 text-[28rem] leading-none font-bold tracking-tighter select-none"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              className="block"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {paddedIndex}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <div className="relative flex">
          {/* Left column */}
          <div className="border-border flex flex-col items-center justify-center border-r pr-16">
            <motion.span
              className="text-muted-foreground font-mono text-xs tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.span>

            {/* Vertical progress line */}
            <div className="bg-border relative mt-8 h-32 w-px">
              <motion.div
                className="bg-foreground absolute top-0 left-0 w-full origin-top"
                animate={{ height: progressHeight }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center content */}
          <div className="flex-1 py-12 pl-16">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeIndex}`}
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {current && (
                  <span className="text-muted-foreground border-border inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
                    <span className="bg-accent h-1.5 w-1.5 rounded-full" />
                    {current.company}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Quote */}
            <div className="relative mb-12 min-h-[140px]">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.blockquote
                    key={`quote-${activeIndex}`}
                    className="text-foreground text-4xl leading-[1.15] font-light tracking-tight md:text-5xl"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {current.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={`${activeIndex}-${i}`}
                        className="mr-[0.3em] inline-block"
                        variants={{
                          hidden: { opacity: 0, y: 20, rotateX: 90 },
                          visible: {
                            opacity: 1, y: 0, rotateX: 0,
                            transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
                          },
                          exit: {
                            opacity: 0, y: -10,
                            transition: { duration: 0.2, delay: i * 0.02 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                )}
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex items-end justify-between">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div
                    key={`author-${activeIndex}`}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <motion.div
                      className="bg-foreground h-px w-8"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className="text-foreground text-base font-medium">{current.author}</p>
                      <p className="text-muted-foreground text-sm">{current.role}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  className="group border-border relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border"
                  whileTap={{ scale: 0.95 }}
                  onClick={goPrev}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-foreground relative z-10 transition-colors">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>

                <motion.button
                  className="group border-border relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border"
                  whileTap={{ scale: 0.95 }}
                  onClick={goNext}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-foreground relative z-10 transition-colors">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="pointer-events-none absolute right-0 -bottom-20 left-0 overflow-hidden opacity-[0.08]">
          <motion.div
            className="flex text-6xl font-bold tracking-tight whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
