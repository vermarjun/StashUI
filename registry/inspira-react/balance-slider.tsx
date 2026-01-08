"use client";
import React, { useMemo, useRef, useState } from "react";

// ---- helpers ----

function hexToHsl(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

// ---- component ----

interface BalanceSliderProps {
  initialValue?: number;
  leftColor?: string;
  rightColor?: string;
  minShiftLimit?: number;
  maxShiftLimit?: number;
  leftContent?: string;
  rightContent?: string;
  indicatorColor?: string;
  borderRadius?: number;
}

export const BalanceSlider = ({
  initialValue = 50,
  leftColor = "#e68a00",
  rightColor = "#ffffff",
  minShiftLimit = 40,
  maxShiftLimit = 68,
  leftContent = "LEFT",
  rightContent = "RIGHT",
  indicatorColor = "#FFFFFF",
  borderRadius = 8,
}: BalanceSliderProps) => {
  const [value, setValue] = useState(initialValue);
  const [active, setActive] = useState(0);

  const shift = useMemo(
    () => (value > minShiftLimit && value < maxShiftLimit ? 1 : 0),
    [value, minShiftLimit, maxShiftLimit],
  );

  const leftColorHsl = useMemo(() => {
    const [h, s] = hexToHsl(leftColor);
    const alpha = 0.4;
    const lightness = 24 + (30 * (100 - value)) / 100;
    return `hsl(${h} ${s}% ${lightness}% / ${alpha})`;
  }, [leftColor, value]);

  const rightColorHsl = useMemo(() => {
    const [h, s, l] = hexToHsl(rightColor);
    const alpha = 0.1 + (0.4 * (100 - value)) / 100;
    return `hsl(${h} ${s}% ${l}% / ${alpha})`;
  }, [rightColor, value]);

  const indicatorColorHsl = useMemo(() => {
    const [h, s, l] = hexToHsl(indicatorColor);
    const activeAlpha = active * 0.5 + 0.5;
    return `hsl(${h} ${s}% ${l}% / ${activeAlpha})`;
  }, [indicatorColor, active]);

  const borderRadiusPx = `${borderRadius}px`;

  // CSS for labels uses CSS counters which we replicate via inline approach
  const lowVal = value;
  const highVal = 100 - value;

  // Easing for shift transform
  const timingFn = `linear(0,0.5007 7.21%,0.7803 12.29%,0.8883 14.93%,0.9724 17.63%,1.0343 20.44%,1.0754 23.44%,1.0898 25.22%,1.0984 27.11%,1.1014 29.15%,1.0989 31.4%,1.0854 35.23%,1.0196 48.86%,1.0043 54.06%,0.9956 59.6%,0.9925 68.11%,1)`;
  const speed = "0.65s";

  return (
    <div
      className="relative mx-auto my-0 grid place-items-center overflow-hidden"
      style={{ width: "320px", height: "120px" }}
      onMouseEnter={() => setActive(1)}
      onMouseLeave={() => setActive(0)}
      onFocus={() => setActive(1)}
      onBlur={() => setActive(0)}
      onTouchStart={() => setActive(1)}
      onTouchEnd={() => setActive(0)}
    >
      {/* Range input (transparent overlay) */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="absolute inset-0 size-full touch-none opacity-0 hover:cursor-grab active:cursor-grabbing"
        style={{ zIndex: 10 }}
      />

      {/* Labels */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-1/2 flex items-center justify-between px-2 text-base font-bold font-mono"
        style={{
          transform: `translateY(${shift * 50}%)`,
          transition: `transform ${speed} ${timingFn}`,
        }}
      >
        <span
          style={{
            color: "hsl(24 74% 54%)",
            mask: `linear-gradient(90deg, hsl(0 0% 100% / 0.6) ${(70 - (value / 100) * 10)}%, hsl(0 0% 100% / 1) ${(70 - (value / 100) * 10)}%)`,
            WebkitMask: `linear-gradient(90deg, hsl(0 0% 100% / 0.6) ${(70 - (value / 100) * 10)}%, hsl(0 0% 100% / 1) ${(70 - (value / 100) * 10)}%)`,
          }}
        >
          {leftContent} {lowVal}%
        </span>
        <span
          style={{
            color: "white",
            mask: `linear-gradient(90deg, hsl(0 0% 100% / 1) ${(50 - (value / 100) * 10)}%, hsl(0 0% 100% / 0.5) ${(50 - (value / 100) * 10)}%)`,
            WebkitMask: `linear-gradient(90deg, hsl(0 0% 100% / 1) ${(50 - (value / 100) * 10)}%, hsl(0 0% 100% / 0.5) ${(50 - (value / 100) * 10)}%)`,
          }}
        >
          {highVal}% {rightContent}
        </span>
      </div>

      {/* Track */}
      <div
        className="pointer-events-none absolute bottom-0 w-full"
        style={{
          height: `calc(50% + ${shift * 50}%)`,
          transition: `height ${speed} ${timingFn}`,
          position: "absolute",
        }}
      >
        {/* Left fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: `calc(${value}% - 0.5rem)`,
            background: leftColorHsl,
            borderRadius: borderRadiusPx,
            transition: "width 0s",
          }}
        />
        {/* Right fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: `calc(${100 - value}% - 0.5rem)`,
            background: rightColorHsl,
            borderRadius: borderRadiusPx,
            transition: "width 0s",
          }}
        />
        {/* Indicator */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${value}%`,
            zIndex: 2,
            height: "75%",
            width: "4px",
            transform: "translateX(-50%) translateY(-50%)",
            borderRadius: "2px",
            background: indicatorColorHsl,
            transition: "left 0s",
          }}
        />
      </div>
    </div>
  );
};
