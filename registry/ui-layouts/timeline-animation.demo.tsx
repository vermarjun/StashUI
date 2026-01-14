'use client';
import { useRef } from 'react';
import { TimelineAnimation } from '@/registry/ui-layouts/timeline-animation';

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full max-w-lg mx-auto p-8 space-y-6">
      <TimelineAnimation animationNum={0} timelineRef={containerRef} className="text-2xl font-bold">
        Step 1: Discovery
      </TimelineAnimation>
      <TimelineAnimation animationNum={1} timelineRef={containerRef} className="text-lg text-gray-600">
        We begin by understanding your goals, audience, and competitive landscape to shape a winning strategy.
      </TimelineAnimation>
      <TimelineAnimation animationNum={2} timelineRef={containerRef} className="text-2xl font-bold">
        Step 2: Design
      </TimelineAnimation>
      <TimelineAnimation animationNum={3} timelineRef={containerRef} className="text-lg text-gray-600">
        Our designers craft beautiful, user-centered interfaces that reflect your brand identity.
      </TimelineAnimation>
      <TimelineAnimation animationNum={4} timelineRef={containerRef} className="text-2xl font-bold">
        Step 3: Launch
      </TimelineAnimation>
      <TimelineAnimation animationNum={5} timelineRef={containerRef} className="text-lg text-gray-600">
        We deploy, monitor, and iterate to ensure your product exceeds expectations from day one.
      </TimelineAnimation>
    </div>
  );
}
