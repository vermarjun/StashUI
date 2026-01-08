"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeamProps {
  width: string | number;
  x: string | number;
  delay: number;
  duration: number;
}

function Beam({ width, x, delay, duration }: BeamProps) {
  const hue = useMemo(() => Math.floor(Math.random() * 360), []);
  const ar = useMemo(() => Math.floor(Math.random() * 10) + 1, []);

  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${ar}`,
          "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
          left: `${x}`,
          width: `${width}`,
          aspectRatio: `1 / ${ar}`,
          background: `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
          position: "absolute",
          top: 0,
        } as React.CSSProperties
      }
      initial={{ x: "-50%", y: "100cqmax" } as any}
      animate={{ x: "-50%", y: "-100%" } as any}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

interface WarpBackgroundProps {
  children?: React.ReactNode;
  perspective?: number;
  beamsPerSide?: number;
  beamSize?: number;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
  gridColor?: string;
  className?: string;
}

interface BeamConfig {
  x: number;
  delay: number;
}

function generateBeams(
  beamsPerSide: number,
  beamSize: number,
  beamDelayMax: number,
  beamDelayMin: number,
): BeamConfig[] {
  const beams: BeamConfig[] = [];
  const cellsPerSide = Math.floor(100 / beamSize);
  const step = cellsPerSide / beamsPerSide;

  for (let i = 0; i < beamsPerSide; i++) {
    const x = Math.floor(i * step);
    const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
    beams.push({ x, delay });
  }
  return beams;
}

export function WarpBackground({
  children,
  perspective = 100,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "hsl(var(--border))",
  className,
}: WarpBackgroundProps) {
  const topBeams = useMemo(
    () => generateBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin),
    [beamsPerSide, beamSize, beamDelayMax, beamDelayMin],
  );
  const bottomBeams = useMemo(
    () => generateBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin),
    [beamsPerSide, beamSize, beamDelayMax, beamDelayMin],
  );
  const leftBeams = useMemo(
    () => generateBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin),
    [beamsPerSide, beamSize, beamDelayMax, beamDelayMin],
  );
  const rightBeams = useMemo(
    () => generateBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin),
    [beamsPerSide, beamSize, beamDelayMax, beamDelayMin],
  );

  const gridStyle = {
    "--perspective": `${perspective}px`,
    "--grid-color": gridColor,
    "--beam-size": `${beamSize}%`,
  } as React.CSSProperties;

  const gridBg = `linear-gradient(${gridColor} 0 1px, transparent 1px ${beamSize}%) 50% -0.5px / ${beamSize}% ${beamSize}%, linear-gradient(90deg, ${gridColor} 0 1px, transparent 1px ${beamSize}%) 50% 50% / ${beamSize}% ${beamSize}%`;

  return (
    <div className={cn("relative rounded border md:p-20", className)}>
      <div
        style={gridStyle}
        className="pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clip-path:inset(0)]"
        // perspective applied via inline style since Tailwind doesn't support CSS vars in transforms directly
      >
        <style>{`
          .warp-3d-container {
            perspective: var(--perspective);
            transform-style: preserve-3d;
          }
        `}</style>
        {/* TOP face */}
        <div
          style={{
            position: "absolute",
            height: "100cqmax",
            width: "100%",
            transformOrigin: "50% 0%",
            transform: "rotateX(-90deg)",
            background: gridBg,
          } as React.CSSProperties}
        >
          {topBeams.map((beam, index) => (
            <Beam
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* BOTTOM face */}
        <div
          style={{
            position: "absolute",
            top: "100%",
            height: "100cqmax",
            width: "100%",
            transformOrigin: "50% 0%",
            transform: "rotateX(-90deg)",
            background: gridBg,
          } as React.CSSProperties}
        >
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* LEFT face */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100cqmax",
            width: "100cqh",
            transformOrigin: "0% 0%",
            transform: "rotate(90deg) rotateX(-90deg)",
            background: gridBg,
          } as React.CSSProperties}
        >
          {leftBeams.map((beam, index) => (
            <Beam
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* RIGHT face */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100cqmax",
            width: "100cqh",
            transformOrigin: "100% 0%",
            transform: "rotate(-90deg) rotateX(-90deg)",
            background: gridBg,
          } as React.CSSProperties}
        >
          {rightBeams.map((beam, index) => (
            <Beam
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
