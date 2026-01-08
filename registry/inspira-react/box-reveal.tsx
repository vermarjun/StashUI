"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface BoxRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Colour of the sliding reveal box. */
  color?: string;
  /** Animation duration in seconds. */
  duration?: number;
  /** Base delay in seconds (content fades in at delay*2). */
  delay?: number;
}

/**
 * Reveals its children with a sliding colour box animation that sweeps
 * away to expose the content beneath.
 */
export const BoxReveal = React.forwardRef<HTMLDivElement, BoxRevealProps>(
  (
    {
      className,
      children,
      color = "#5046e6",
      duration = 0.5,
      delay = 0.25,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Content fades / slides up after the box exits */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration, delay: delay * 2 }}
        >
          {children}
        </motion.div>

        {/* Sliding colour box */}
        <motion.div
          className="absolute inset-0 z-20"
          style={{ background: color }}
          initial={{ left: "0%" }}
          whileInView={{ left: "100%" }}
          viewport={{ once: true }}
          transition={{ duration, ease: "easeIn", delay }}
        />
      </div>
    );
  },
);
BoxReveal.displayName = "BoxReveal";
