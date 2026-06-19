"use client";
import { CanvasText } from "@/registry/aceternity-ui/canvas-text";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full py-16">
      <span className="text-6xl font-black tracking-tighter">
        <CanvasText text="Canvas" />
      </span>
    </div>
  );
}
