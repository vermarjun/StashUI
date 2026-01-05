"use client";

import { LightBoard } from "@/registry/cult-ui/lightboard";

export default function Demo() {
  return (
    <div className="w-full flex items-center justify-center p-8 bg-gray-950 rounded-xl">
      <LightBoard
        text="HELLO WORLD"
        rows={5}
        lightSize={8}
        gap={2}
        font="default"
        updateInterval={50}
        disableDrawing={true}
      />
    </div>
  );
}
