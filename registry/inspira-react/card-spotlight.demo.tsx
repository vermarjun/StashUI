"use client";

import { CardSpotlight } from "@/registry/inspira-react/card-spotlight";

export default function CardSpotlightDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-16">
      <CardSpotlight className="h-56 w-72 p-6">
        <h3 className="mb-2 text-lg font-bold">Move your cursor</h3>
        <p className="text-sm text-muted-foreground">
          The spotlight follows your mouse across the card surface.
        </p>
      </CardSpotlight>

      <CardSpotlight
        className="h-56 w-72 p-6"
        gradientColor="#1a1a3e"
        gradientSize={300}
        gradientOpacity={0.9}
      >
        <h3 className="mb-2 text-lg font-bold">Indigo spotlight</h3>
        <p className="text-sm text-muted-foreground">
          Larger radius with a deep indigo glow. Hover me!
        </p>
      </CardSpotlight>

      <CardSpotlight
        className="h-56 w-72 p-6"
        gradientColor="#3d1a00"
        gradientSize={150}
        gradientOpacity={0.7}
      >
        <h3 className="mb-2 text-lg font-bold">Warm glow</h3>
        <p className="text-sm text-muted-foreground">
          Small, warm amber spotlight for a cosy feel.
        </p>
      </CardSpotlight>
    </div>
  );
}
