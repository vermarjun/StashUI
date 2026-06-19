"use client";

import { Lens } from "@/registry/magic-ui/lens";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Lens lensSize={150} zoomFactor={1.5}>
        <img
          src="https://picsum.photos/seed/lens-demo/600/400"
          alt="Lens demo"
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
      </Lens>
    </div>
  );
}
