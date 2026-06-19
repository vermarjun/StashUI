"use client";
import Text3DFlip from "@/registry/magic-ui/text-3d-flip";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12">
      <Text3DFlip
        as="h1"
        className="text-5xl font-bold text-foreground cursor-default"
        rotateDirection="right"
      >
        Hover to Flip
      </Text3DFlip>
      <Text3DFlip
        as="h2"
        className="text-3xl font-semibold text-muted-foreground cursor-default"
        rotateDirection="bottom"
        staggerFrom="center"
      >
        3D Typography
      </Text3DFlip>
    </div>
  );
}
