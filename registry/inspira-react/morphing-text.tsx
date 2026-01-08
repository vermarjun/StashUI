"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface MorphingTextProps {
  texts: string[];
  morphTime?: number;
  coolDownTime?: number;
  className?: string;
}

const TEXT_CLASSES = "absolute inset-x-0 top-0 m-auto inline-block w-full";

export function MorphingText({
  texts,
  morphTime = 1.5,
  coolDownTime = 0.5,
  className,
}: MorphingTextProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const coolDownRef = useRef(0);
  const timeRef = useRef(new Date());
  const animationFrameRef = useRef(0);

  useEffect(() => {
    function setStyles(fraction: number) {
      if (!text1Ref.current || !text2Ref.current) return;

      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${fraction ** 0.4 * 100}%`;

      const invertedFraction = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${invertedFraction ** 0.4 * 100}%`;

      text1Ref.current.textContent = texts[textIndexRef.current % texts.length];
      text2Ref.current.textContent = texts[(textIndexRef.current + 1) % texts.length];
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
        textIndexRef.current++;
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
      animationFrameRef.current = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      coolDownRef.current -= dt;

      if (coolDownRef.current <= 0) {
        doMorph();
      } else {
        doCoolDown();
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [texts, morphTime, coolDownTime]);

  return (
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
        className,
      )}
      style={{ filter: "url(#threshold) blur(0.6px)" }}
    >
      <span ref={text1Ref} className={TEXT_CLASSES} />
      <span ref={text2Ref} className={TEXT_CLASSES} />

      <svg
        id="filters"
        className="fixed size-0"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
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
