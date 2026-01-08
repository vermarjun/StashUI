"use client";

import { ParticleImage } from "@/registry/inspira-react/particle-image";

export default function ParticleImageDemo() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 p-8">
      <p className="text-sm text-muted-foreground mb-2">
        Hover over the canvas to interact with particles
      </p>
      <ParticleImage
        imageSrc="/placeholder-logo.png"
        canvasWidth="300"
        canvasHeight="200"
        particleGap="3"
        particleSize="2"
        gravity="0.08"
        mouseForce="30"
        initPosition="random"
        initDirection="random"
        renderer="default"
      />
    </div>
  );
}
