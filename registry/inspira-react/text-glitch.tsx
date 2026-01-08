"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

interface TextGlitchProps {
  text?: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

export function TextGlitch({
  text = "",
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className,
}: TextGlitchProps) {
  const afterDuration = `${speed * 3}s`;
  const beforeDuration = `${speed * 2}s`;
  const afterShadow = enableShadows ? "-5px 0 red" : "none";
  const beforeShadow = enableShadows ? "5px 0 cyan" : "none";

  const styleId = useMemo(
    () => `text-glitch-${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  const hoverClass = enableOnHover ? "glitch-hover" : "glitch-always";

  return (
    <>
      <style>{`
        .${styleId} {
          color: #fff;
          font-size: clamp(2rem, 10vw, 6rem);
          white-space: nowrap;
          font-weight: 900;
          position: relative;
          margin: 0 auto;
          user-select: none;
          cursor: pointer;
        }
        .${styleId}::after,
        .${styleId}::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          color: #fff;
          background-color: #060606;
          overflow: hidden;
          clip-path: inset(0 0 0 0);
        }
        .${styleId}.glitch-always::after {
          left: 10px;
          text-shadow: ${afterShadow};
          animation: glitch-animate-after ${afterDuration} infinite linear alternate-reverse;
        }
        .${styleId}.glitch-always::before {
          left: -10px;
          text-shadow: ${beforeShadow};
          animation: glitch-animate-before ${beforeDuration} infinite linear alternate-reverse;
        }
        .${styleId}.glitch-hover::after,
        .${styleId}.glitch-hover::before {
          content: "";
          opacity: 0;
          animation: none;
        }
        .${styleId}.glitch-hover:hover::after {
          content: attr(data-text);
          opacity: 1;
          left: 10px;
          text-shadow: ${afterShadow};
          animation: glitch-animate-after ${afterDuration} infinite linear alternate-reverse;
        }
        .${styleId}.glitch-hover:hover::before {
          content: attr(data-text);
          opacity: 1;
          left: -10px;
          text-shadow: ${beforeShadow};
          animation: glitch-animate-before ${beforeDuration} infinite linear alternate-reverse;
        }
        @keyframes glitch-animate-after {
          0%   { clip-path: inset(20% 0 50% 0); }
          5%   { clip-path: inset(10% 0 60% 0); }
          10%  { clip-path: inset(15% 0 55% 0); }
          15%  { clip-path: inset(25% 0 35% 0); }
          20%  { clip-path: inset(30% 0 40% 0); }
          25%  { clip-path: inset(40% 0 20% 0); }
          30%  { clip-path: inset(10% 0 60% 0); }
          35%  { clip-path: inset(15% 0 55% 0); }
          40%  { clip-path: inset(25% 0 35% 0); }
          45%  { clip-path: inset(30% 0 40% 0); }
          50%  { clip-path: inset(20% 0 50% 0); }
          55%  { clip-path: inset(10% 0 60% 0); }
          60%  { clip-path: inset(15% 0 55% 0); }
          65%  { clip-path: inset(25% 0 35% 0); }
          70%  { clip-path: inset(30% 0 40% 0); }
          75%  { clip-path: inset(40% 0 20% 0); }
          80%  { clip-path: inset(20% 0 50% 0); }
          85%  { clip-path: inset(10% 0 60% 0); }
          90%  { clip-path: inset(15% 0 55% 0); }
          95%  { clip-path: inset(25% 0 35% 0); }
          100% { clip-path: inset(30% 0 40% 0); }
        }
        @keyframes glitch-animate-before {
          0%   { clip-path: inset(20% 0 50% 0); }
          5%   { clip-path: inset(10% 0 60% 0); }
          10%  { clip-path: inset(15% 0 55% 0); }
          15%  { clip-path: inset(25% 0 35% 0); }
          20%  { clip-path: inset(30% 0 40% 0); }
          25%  { clip-path: inset(40% 0 20% 0); }
          30%  { clip-path: inset(10% 0 60% 0); }
          35%  { clip-path: inset(15% 0 55% 0); }
          40%  { clip-path: inset(25% 0 35% 0); }
          45%  { clip-path: inset(30% 0 40% 0); }
          50%  { clip-path: inset(20% 0 50% 0); }
          55%  { clip-path: inset(10% 0 60% 0); }
          60%  { clip-path: inset(15% 0 55% 0); }
          65%  { clip-path: inset(25% 0 35% 0); }
          70%  { clip-path: inset(30% 0 40% 0); }
          75%  { clip-path: inset(40% 0 20% 0); }
          80%  { clip-path: inset(20% 0 50% 0); }
          85%  { clip-path: inset(10% 0 60% 0); }
          90%  { clip-path: inset(15% 0 55% 0); }
          95%  { clip-path: inset(25% 0 35% 0); }
          100% { clip-path: inset(30% 0 40% 0); }
        }
      `}</style>
      <div
        data-text={text}
        className={cn(styleId, hoverClass, className)}
      >
        {text}
      </div>
    </>
  );
}
