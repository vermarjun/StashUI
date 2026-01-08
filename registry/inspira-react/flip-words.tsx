"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FlipWords({
  words,
  duration = 3000,
  className,
  onAnimationStart,
  onAnimationComplete,
}: FlipWordsProps) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAnimation = useCallback(() => {
    setIsVisible(false);

    setTimeout(() => {
      const currentIndex = words.indexOf(currentWord);
      const nextWord = words[currentIndex + 1] ?? words[0];
      setCurrentWord(nextWord);
      setIsVisible(true);
    }, 600);
  }, [words, currentWord]);

  const scheduleNext = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      startAnimation();
    }, duration);
  }, [startAnimation, duration]);

  // Start timer on mount
  useEffect(() => {
    scheduleNext();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reschedule when word becomes visible again
  useEffect(() => {
    if (isVisible) {
      scheduleNext();
      onAnimationStart?.();
    } else {
      onAnimationComplete?.();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  const splitWords = currentWord.split(" ").map((word) => ({
    word,
    letters: word.split(""),
  }));

  return (
    <>
      <style>{`
        @keyframes flipWordsIn {
          0% { opacity: 0; transform: translateY(10px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes flipLetterIn {
          0% { opacity: 0; transform: translateY(10px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes flipWordsOut {
          0% { opacity: 1; transform: scale(1); filter: blur(0); }
          100% { opacity: 0; transform: scale(2); filter: blur(8px); }
        }
        @keyframes flipWordsEnter {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes flipWordsLeave {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
      <div className="relative inline-block px-2">
        <div
          className={cn(
            "relative z-10 inline-block text-left text-neutral-900 dark:text-neutral-100",
            className
          )}
          style={{
            animation: isVisible
              ? "flipWordsEnter 0.6s ease-in-out forwards"
              : "flipWordsLeave 0.6s ease-in-out forwards",
          }}
        >
          {splitWords.map(({ word, letters }, wordIndex) => (
            <span
              key={word + wordIndex}
              className="inline-block whitespace-nowrap opacity-0"
              style={{
                animation: isVisible
                  ? `flipWordsIn 0.3s ease forwards`
                  : undefined,
                animationDelay: isVisible ? `${wordIndex * 0.3}s` : undefined,
              }}
            >
              {letters.map((letter, letterIndex) => (
                <span
                  key={word + letterIndex}
                  className="inline-block opacity-0"
                  style={{
                    animation: isVisible
                      ? `flipLetterIn 0.2s ease forwards`
                      : undefined,
                    animationDelay: isVisible
                      ? `${wordIndex * 0.3 + letterIndex * 0.05}s`
                      : undefined,
                  }}
                >
                  {letter}
                </span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
