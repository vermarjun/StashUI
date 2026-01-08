"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomLetter() {
  return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
}

interface HyperTextProps {
  text: string;
  duration?: number;
  animateOnLoad?: boolean;
  className?: string;
}

export function HyperText({
  text,
  duration = 800,
  animateOnLoad = true,
  className,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(text.split(""));
  const iterationsRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const triggerAnimation = useCallback(() => {
    stopAnimation();
    iterationsRef.current = 0;
    const intervalMs = duration / (text.length * 10);

    intervalRef.current = setInterval(() => {
      if (iterationsRef.current < text.length) {
        setDisplayText(
          text.split("").map((l, i) =>
            l === " "
              ? l
              : i <= iterationsRef.current
              ? text[i]
              : getRandomLetter()
          )
        );
        iterationsRef.current += 0.1;
      } else {
        stopAnimation();
      }
    }, intervalMs);
  }, [text, duration, stopAnimation]);

  // Reset display when text prop changes
  useEffect(() => {
    setDisplayText(text.split(""));
    triggerAnimation();
  }, [text, triggerAnimation]);

  // Animate on load
  useEffect(() => {
    if (animateOnLoad) {
      triggerAnimation();
    }
    return stopAnimation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn("flex scale-100 cursor-default overflow-hidden py-2", className)}
      onMouseEnter={triggerAnimation}
    >
      <div className="flex">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * (duration / (text.length * 10)) / 1000 }}
            className={cn("inline-block font-mono", letter === " " ? "w-3" : "")}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
