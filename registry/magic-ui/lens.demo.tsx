"use client";

import { Lens } from "@/registry/magic-ui/lens";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Lens lensSize={150} zoomFactor={1.5}>
        <img
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=600&h=400&fit=crop&auto=format&q=80"
          alt="Lens demo"
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
      </Lens>
    </div>
  );
}
