"use client";

import { Text3d } from "@/registry/inspira-react/text-3d";

export default function Text3dDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center bg-background p-8">
      <Text3d
        textColor="white"
        strokeColor="black"
        shadowColor="#facc15"
        strokeSize={18}
        shadow1Size={6}
        shadow2Size={10}
        animate={true}
        animationDuration={1500}
        className="text-6xl font-black"
      >
        Hello 3D
      </Text3d>
    </div>
  );
}
