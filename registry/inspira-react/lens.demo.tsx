"use client";

import { Lens } from "@/registry/inspira-react/lens";

export default function LensDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <Lens zoomFactor={2} lensSize={150}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
          alt="Mountain landscape"
          className="h-[350px] w-[550px] rounded-xl object-cover"
        />
      </Lens>
    </div>
  );
}
