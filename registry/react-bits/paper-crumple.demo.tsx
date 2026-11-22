"use client";

import PaperCrumple from "@/registry/react-bits/paper-crumple";

export default function Demo() {
  return (
    <div className="relative w-full bg-background">
      <PaperCrumple
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
        alt="Mountain range above the clouds"
        width={340}
        height={420}
        sceneHeight={600}
        releaseBehavior="restore"
      />
      <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-sm text-muted-foreground">
        Hold and drag the photo to crumple it
      </p>
    </div>
  );
}
