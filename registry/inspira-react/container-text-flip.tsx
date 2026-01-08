"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  animationDuration?: number;
  className?: string;
  textClass?: string;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  animationDuration = 700,
  className,
  textClass,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, words.length]);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.scrollWidth + 30);
    }
  }, [currentWordIndex]);

  const currentWord = words[currentWordIndex];
  const letters = useMemo(() => Array.from(currentWord), [currentWord]);

  return (
    <LayoutGroup>
      <motion.p
        layoutId={`words-here-${id}`}
        animate={{ width }}
        transition={{ duration: animationDuration / 2000 }}
        className={cn(
          "relative inline-block rounded-lg px-4 pt-2 pb-3 text-center text-4xl font-bold text-black shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,0_4px_8px_#d1d5db] [background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)] md:text-7xl dark:text-white dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),0_4px_8px_#00000052] dark:[background:linear-gradient(to_bottom,#374151,#1f2937)]",
          className,
        )}
      >
        <motion.div
          ref={textRef}
          layoutId={`word-div-${currentWord}-${id}`}
          transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
          className={cn("inline-block", textClass)}
        >
          <motion.div className="inline-block">
            <AnimatePresence mode="popLayout">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${currentWordIndex}-${index}`}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ delay: index * 0.02 }}
                >
                  {letter}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.p>
    </LayoutGroup>
  );
}
