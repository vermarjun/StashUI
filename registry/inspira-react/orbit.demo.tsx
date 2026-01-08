"use client";

import { Orbit, ORBIT_DIRECTION } from "@/registry/inspira-react/orbit";

export default function OrbitDemo() {
  return (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden">
      {/* Center element */}
      <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
        Center
      </div>

      {/* Inner orbit */}
      <Orbit radius={80} duration={8} delay={0} path>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-xs shadow">
          ⚡
        </div>
      </Orbit>

      {/* Outer orbit — counter-clockwise */}
      <Orbit
        radius={130}
        duration={14}
        delay={5}
        direction={ORBIT_DIRECTION.CounterClockwise}
        path
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white text-sm shadow">
          🌙
        </div>
      </Orbit>
    </div>
  );
}
