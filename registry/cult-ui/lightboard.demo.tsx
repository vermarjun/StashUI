"use client";

import { LightBoard } from "@/registry/cult-ui/lightboard";

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-5xl rounded-2xl border border-border bg-neutral-950 p-6 shadow-2xl">
        <LightBoard
          text="NOW SHOWING  STASHUI  DOORS 7PM"
          rows={12}
          lightSize={6}
          gap={2}
          font="default"
          updateInterval={70}
          disableDrawing={true}
          colors={{
            background: "rgba(60, 60, 75, 0.35)",
            textBright: "rgba(255, 196, 92, 1)",
            textDim: "rgba(255, 196, 92, 0.45)",
          }}
        />
      </div>
    </div>
  );
}
