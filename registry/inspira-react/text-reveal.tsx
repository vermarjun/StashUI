"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import React, { useRef } from "react";

interface TextRevealProps {
  className?: string;
  containerClass?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  children?: React.ReactNode;
}

/**
 * Splits children text into words and animates them up from below the overflow
 * boundary — equivalent to the GSAP SplitText + mask-lines reveal from the
 * original Vue implementation.
 */
export function TextReveal({
  className,
  containerClass,
  duration = 0.6,
  delay = 0.2,
  stagger = 0.1,
  children,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  // Collect text content from children and split into words preserving spaces.
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ").filter(Boolean);

  // If children is not a plain string, wrap the whole thing and animate as one unit.
  if (typeof children !== "string") {
    return (
      <div className={cn("overflow-hidden", containerClass)}>
        <motion.div
          ref={ref}
          className={cn(className)}
          initial={{ yPercent: 100, opacity: 0 }}
          animate={isInView ? { yPercent: 0, opacity: 1 } : {}}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", containerClass)}>
      <div className={cn("flex flex-wrap", className)}>
        {words.map((word, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className="inline-block mr-[0.25em]"
              initial={{ yPercent: 100, opacity: 0 }}
              animate={isInView ? { yPercent: 0, opacity: 1 } : {}}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}
