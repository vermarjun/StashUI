"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SpinningTextProps {
  text: string;
  duration?: number;
  className?: string;
  reverse?: boolean;
  radius?: number;
  transition?: {
    duration?: number;
    ease?: string;
    [key: string]: unknown;
  };
  variants?: {
    container?: Record<string, unknown>;
    item?: Record<string, unknown>;
  };
}

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: "linear" as const,
};

const BASE_ITEM_VARIANTS = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function SpinningText({
  text,
  duration = 10,
  className,
  reverse = false,
  radius = 5,
  transition,
  variants,
}: SpinningTextProps) {
  const letters = useMemo(() => {
    const chars = text.split("");
    chars.push(" ");
    return chars;
  }, [text]);

  const finalTransition = useMemo(
    () => ({
      ...BASE_TRANSITION,
      ...transition,
      duration: transition?.duration ?? duration,
    }),
    [transition, duration],
  );

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      visible: { rotate: reverse ? -360 : 360 },
      ...variants?.container,
    }),
    [reverse, variants?.container],
  );

  const itemVariants = useMemo(
    () => ({
      ...BASE_ITEM_VARIANTS,
      ...variants?.item,
    }),
    [variants?.item],
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
      className={cn("relative", className)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={itemVariants}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `
              translate(-50%, -50%)
              rotate(${(360 / letters.length) * index}deg)
              translateY(${radius * -1}ch)
            `,
            transformOrigin: "center",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default SpinningText;
