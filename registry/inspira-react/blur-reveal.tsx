"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface BlurRevealProps {
  /** Duration (seconds) for each child animation. */
  duration?: number;
  /** Stagger delay (seconds) between each child. */
  delay?: number;
  /** Initial blur amount. */
  blur?: string;
  /** Initial Y offset in pixels. */
  yOffset?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Wraps each direct child in a motion div that animates from
 * blurred + offset to sharp + in-place when it enters the viewport.
 */
export function BlurReveal({
  duration = 1,
  delay = 0.2,
  blur = "20px",
  yOffset = 20,
  className,
  children,
}: BlurRevealProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={cn(className)}>
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            filter: `blur(${blur})`,
            y: yOffset,
          }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration,
            ease: "easeInOut",
            delay: delay * index,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
