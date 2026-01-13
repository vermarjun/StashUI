'use client';
import { useRef } from 'react';
import { AnimatedBeam, Circle, Icons } from '@/registry/ui-layouts/animated-beam';

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const claudeRef = useRef<HTMLDivElement>(null);
  const typescriptRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto h-64 flex items-center justify-center overflow-hidden rounded-xl bg-white/5 p-4"
    >
      {/* Center logo */}
      <Circle ref={logoRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Icons.logo />
      </Circle>

      {/* Surrounding nodes */}
      <Circle ref={userRef} className="absolute left-[10%] top-1/2 -translate-y-1/2">
        <Icons.user />
      </Circle>
      <Circle ref={claudeRef} className="absolute right-[10%] top-1/2 -translate-y-1/2">
        <Icons.claude />
      </Circle>
      <Circle ref={typescriptRef} className="absolute left-1/2 top-[10%] -translate-x-1/2">
        <Icons.typescript />
      </Circle>
      <Circle ref={reactRef} className="absolute left-1/2 bottom-[10%] -translate-x-1/2">
        <Icons.reactjs />
      </Circle>

      {/* Beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={userRef} toRef={logoRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={claudeRef} toRef={logoRef} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={typescriptRef} toRef={logoRef} curvature={-30} />
      <AnimatedBeam containerRef={containerRef} fromRef={reactRef} toRef={logoRef} curvature={30} />
    </div>
  );
}
