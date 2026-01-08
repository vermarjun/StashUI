"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

export function Focus({
  sentence = "Inspira Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}: FocusProps) {
  const words = sentence.split(" ");
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  const updateFocusRect = useCallback(
    (index: number) => {
      const wordEl = wordRefs.current[index];
      const containerEl = containerRef.current;
      if (!wordEl || !containerEl) return;

      const parentRect = containerEl.getBoundingClientRect();
      const wordRect = wordEl.getBoundingClientRect();

      setFocusRect({
        x: wordRect.left - parentRect.left,
        y: wordRect.top - parentRect.top,
        width: wordRect.width,
        height: wordRect.height,
      });
    },
    [],
  );

  useEffect(() => {
    updateFocusRect(currentIndex);
  }, [currentIndex, updateFocusRect]);

  useEffect(() => {
    if (manualMode) return;
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      },
      (animationDuration + pauseBetweenAnimations) * 1000,
    );
    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex gap-4 justify-center items-center flex-wrap"
    >
      {words.map((word, index) => (
        <span
          key={`${word}_${index}`}
          ref={(el) => {
            wordRefs.current[index] = el;
          }}
          className="relative text-5xl font-black cursor-pointer transition-[filter,color] duration-300"
          style={{
            filter:
              index === currentIndex
                ? "blur(0px)"
                : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`,
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {word}
        </span>
      ))}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-content border-none"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{ "--border-color": borderColor } as React.CSSProperties}
      >
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] transition-none"
          style={{
            top: "-10px",
            left: "-10px",
            borderRight: "none",
            borderBottom: "none",
            borderColor,
            filter: `drop-shadow(0px 0px 4px ${borderColor})`,
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] transition-none"
          style={{
            top: "-10px",
            right: "-10px",
            borderLeft: "none",
            borderBottom: "none",
            borderColor,
            filter: `drop-shadow(0px 0px 4px ${borderColor})`,
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] transition-none"
          style={{
            bottom: "-10px",
            left: "-10px",
            borderRight: "none",
            borderTop: "none",
            borderColor,
            filter: `drop-shadow(0px 0px 4px ${borderColor})`,
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] transition-none"
          style={{
            bottom: "-10px",
            right: "-10px",
            borderLeft: "none",
            borderTop: "none",
            borderColor,
            filter: `drop-shadow(0px 0px 4px ${borderColor})`,
          }}
        />
      </motion.div>
    </div>
  );
}
