"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface EncryptedTextProps {
  text: string;
  className?: string;
  revealDelayMs?: number;
  charset?: string;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
}

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function randomChar(charset: string): string {
  return charset.charAt(Math.floor(Math.random() * charset.length));
}

function gibberishPreservingSpaces(original: string, charset: string): string {
  return original
    .split("")
    .map((ch) => (ch === " " ? " " : randomChar(charset)))
    .join("");
}

// ─── Component ────────────────────────────────────────────────────────────────
export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [revealCount, setRevealCount] = useState(0);
  const [scrambleChars, setScrambleChars] = useState<string[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastFlipTimeRef = useRef<number>(0);

  const textArray = useMemo(() => text.split(""), [text]);

  const stopAnimation = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!text) return;
    stopAnimation();

    const initial = gibberishPreservingSpaces(text, charset).split("");
    setScrambleChars(initial);
    setRevealCount(0);

    const now = performance.now();
    startTimeRef.current = now;
    lastFlipTimeRef.current = now;

    function frame(time: number) {
      const elapsed = time - startTimeRef.current;
      const totalLength = text.length;
      const currentReveal = Math.min(
        totalLength,
        Math.floor(elapsed / Math.max(1, revealDelayMs))
      );

      setRevealCount(currentReveal);

      if (currentReveal >= totalLength) return;

      const timeSinceFlip = time - lastFlipTimeRef.current;
      if (timeSinceFlip >= Math.max(0, flipDelayMs)) {
        setScrambleChars((prev) => {
          const next = [...prev];
          for (let i = currentReveal; i < totalLength; i++) {
            next[i] = text[i] === " " ? " " : randomChar(charset);
          }
          return next;
        });
        lastFlipTimeRef.current = time;
      }

      rafIdRef.current = requestAnimationFrame(frame);
    }

    rafIdRef.current = requestAnimationFrame(frame);
  }, [text, charset, revealDelayMs, flipDelayMs, stopAnimation]);

  // IntersectionObserver to trigger when in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
          setRevealCount(0);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  // Re-run when text changes
  useEffect(() => {
    startAnimation();
  }, [text, startAnimation]);

  return (
    <span ref={containerRef} className={className} aria-label={text} role="text">
      {textArray.map((_, index) => {
        const isRevealed = index < revealCount;
        const char = text[index];
        const displayChar =
          isRevealed
            ? char || ""
            : char === " "
            ? " "
            : scrambleChars[index] || randomChar(charset);

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayChar}
          </span>
        );
      })}
    </span>
  );
}
