"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TextRevealStarsProps {
  starsCount?: number;
  className?: string;
}

function randomMove() {
  return Math.random() * 4 - 2;
}
function randomOpacity() {
  return Math.random();
}
function random() {
  return Math.random();
}
function generatePosition() {
  return {
    top: `calc(${random() * 100}% + ${randomMove()}px)`,
    left: `calc(${random() * 100}% + ${randomMove()}px)`,
  };
}
function generateEnterAnimation() {
  return {
    top: `calc(${random() * 100}% + ${randomMove()}px)`,
    left: `calc(${random() * 100}% + ${randomMove()}px)`,
    opacity: randomOpacity(),
    scale: [1, 1.2, 0],
  };
}

export function TextRevealStars({
  starsCount = 130,
  className,
}: TextRevealStarsProps) {
  const randomDuration = random() * 10 + 20;

  return (
    <div className="absolute inset-0">
      {Array.from({ length: starsCount }, (_, i) => (
        <motion.span
          key={`star-${i}`}
          initial={generatePosition()}
          animate={generateEnterAnimation()}
          transition={{
            duration: randomDuration,
            repeat: Infinity,
            ease: "linear",
          }}
          className={cn(
            "absolute z-[1] inline-block h-0.5 w-0.5 rounded-full bg-white",
            className
          )}
        />
      ))}
    </div>
  );
}
