"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TEXT_CLASSES = "absolute inset-x-0 top-0 m-auto inline-block w-full";

interface TextMorphProps {
  text: string;
  morphTime?: number;
  coolDownTime?: number;
  className?: string;
}

export function TextMorph({
  text,
  morphTime = 1.5,
  coolDownTime = 0.5,
  className,
}: TextMorphProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const previousTextRef = useRef(text);
  const currentTextRef = useRef(text);
  const morphRef = useRef(0);
  const coolDownRef = useRef(0);
  const timeRef = useRef(Date.now());
  const isAnimatingRef = useRef(false);
  const rafRef = useRef(0);

  // Trigger re-render to track text prop change
  const [, forceUpdate] = useState(0);

  function setStyles(fraction: number) {
    if (!text1Ref.current || !text2Ref.current) return;
    text2Ref.current.textContent = currentTextRef.current;
    text1Ref.current.textContent = previousTextRef.current;

    text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text2Ref.current.style.opacity = `${fraction ** 0.4 * 100}%`;

    const invertedFraction = 1 - fraction;
    text1Ref.current.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
    text1Ref.current.style.opacity = `${invertedFraction ** 0.4 * 100}%`;
  }

  function doMorph() {
    morphRef.current -= coolDownRef.current;
    coolDownRef.current = 0;

    let fraction = morphRef.current / morphTime;
    if (fraction > 1) {
      coolDownRef.current = coolDownTime;
      fraction = 1;
    }
    setStyles(fraction);
    if (fraction === 1) {
      previousTextRef.current = currentTextRef.current;
    }
  }

  function doCoolDown() {
    morphRef.current = 0;
    if (text1Ref.current && text2Ref.current) {
      text2Ref.current.style.filter = "none";
      text2Ref.current.style.opacity = "100%";
      text1Ref.current.style.filter = "none";
      text1Ref.current.style.opacity = "0%";
    }
  }

  function animate() {
    rafRef.current = requestAnimationFrame(animate);
    const now = Date.now();
    const dt = (now - timeRef.current) / 1000;
    timeRef.current = now;

    coolDownRef.current -= dt;
    if (coolDownRef.current <= 0) {
      morphRef.current += dt;
      doMorph();
      if (coolDownRef.current > 0) {
        cancelAnimationFrame(rafRef.current);
        isAnimatingRef.current = false;
      }
    } else {
      doCoolDown();
    }
  }

  // Watch text changes
  useEffect(() => {
    if (text !== currentTextRef.current) {
      previousTextRef.current = currentTextRef.current;
      currentTextRef.current = text;
      morphRef.current = 0;
      coolDownRef.current = 0;
      timeRef.current = Date.now();

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animate();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "relative h-16 w-full max-w-screen-md text-center font-sans text-[40pt] leading-none font-bold",
        "[filter:url(#threshold)_blur(0.6px)]",
        className,
      )}
    >
      <span ref={text1Ref} className={TEXT_CLASSES} />
      <span ref={text2Ref} className={TEXT_CLASSES} />
      <svg id="filters" className="fixed size-0" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default TextMorph;
