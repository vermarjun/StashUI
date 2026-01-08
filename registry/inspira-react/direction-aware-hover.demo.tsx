"use client";

import { DirectionAwareHover } from "@/registry/inspira-react/direction-aware-hover";

export default function DirectionAwareHoverDemo() {
  return (
    <div className="flex min-h-[400px] flex-wrap items-center justify-center gap-6 p-8">
      <DirectionAwareHover
        imageUrl="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?w=600"
      >
        <div>
          <p className="font-bold text-lg">Mountain View</p>
          <p className="text-sm opacity-80">Hover to reveal direction</p>
        </div>
      </DirectionAwareHover>

      <DirectionAwareHover
        imageUrl="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600"
      >
        <div>
          <p className="font-bold text-lg">Forest Path</p>
          <p className="text-sm opacity-80">Interactive reveal</p>
        </div>
      </DirectionAwareHover>
    </div>
  );
}
