"use client";

import { ParticlesBg } from "@/registry/inspira-react/particles-bg";

export default function ParticlesBgDemo() {
  return (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
      <ParticlesBg
        color="#6366f1"
        quantity={120}
        staticity={50}
        ease={50}
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 text-center">
        <h3 className="text-2xl font-bold">Particles Background</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Move your mouse to interact
        </p>
      </div>
    </div>
  );
}
