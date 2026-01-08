"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterPullupProps {
  className?: string;
  words: string;
  delay?: number;
}

const pullupVariant = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export function LetterPullup({ className, words, delay = 0.05 }: LetterPullupProps) {
  const letters = words.split("");

  return (
    <div className="flex justify-center">
      {letters.map((letter, index) => (
        <motion.h1
          key={index}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          transition={{
            delay: index * delay,
          }}
          className={cn(
            "font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-4xl md:leading-[5rem]",
            className
          )}
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  );
}
