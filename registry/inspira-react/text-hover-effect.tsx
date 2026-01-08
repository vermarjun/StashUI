"use client";

import { useCallback, useRef, useState } from "react";

interface TextHoverEffectProps {
  strokeWidth?: number;
  text: string;
  duration?: number;
  opacity?: number;
}

export function TextHoverEffect({
  strokeWidth = 0.75,
  text,
  duration = 200,
  opacity = 0.75,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const transitionDuration = duration;

  const getMaskPosition = () => {
    if (svgRef.current && hovered) {
      const rect = svgRef.current.getBoundingClientRect();
      const cx = ((cursor.x - rect.left) / rect.width) * 100;
      const cy = ((cursor.y - rect.top) / rect.height) * 100;
      return { cx: `${cx}%`, cy: `${cy}%` };
    }
    return { cx: "50%", cy: "50%" };
  };

  const maskPos = getMaskPosition();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setCursor({ x: touch.clientX, y: touch.clientY });
  }, []);

  const strokeStyle: React.CSSProperties = {
    strokeDashoffset: hovered ? "0" : "1000",
    strokeDasharray: "1000",
    transition: "stroke-dashoffset 4s ease-in-out, stroke-dasharray 4s ease-in-out",
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onTouchMove={handleTouchMove}
    >
      <defs>
        <linearGradient
          id="textGradientHover"
          gradientUnits="userSpaceOnUse"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="var(--color-yellow-500, #eab308)" />
              <stop offset="25%" stopColor="var(--color-red-500, #ef4444)" />
              <stop offset="50%" stopColor="var(--color-blue-500, #3b82f6)" />
              <stop offset="75%" stopColor="var(--color-cyan-500, #06b6d4)" />
              <stop offset="100%" stopColor="var(--color-violet-500, #8b5cf6)" />
            </>
          )}
        </linearGradient>

        <radialGradient
          id="revealMaskHover"
          gradientUnits="userSpaceOnUse"
          r="20%"
          cx={maskPos.cx}
          cy={maskPos.cy}
          style={{
            transition: `cx ${transitionDuration}ms ease-out, cy ${transitionDuration}ms ease-out`,
          }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        <mask id="textMaskHover">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMaskHover)" />
        </mask>
      </defs>

      {/* Background outline (faint, visible on hover) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        style={{ opacity: hovered ? opacity : 0 }}
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
      >
        {text}
      </text>

      {/* Animated stroke */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        style={strokeStyle}
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
      >
        {text}
      </text>

      {/* Gradient text revealed by mouse */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradientHover)"
        strokeWidth={strokeWidth}
        mask="url(#textMaskHover)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
}
