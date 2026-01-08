"use client";
import { SleekLineCursor } from "@/registry/inspira-react/sleek-line-cursor";

export default function SleekLineCursorDemo() {
  return (
    <div className="relative flex h-64 w-full items-center justify-center rounded-lg border bg-black">
      <SleekLineCursor trails={20} friction={0.5} size={50} dampening={0.25} tension={0.98} />
      <p className="text-white text-sm">Move your mouse to see the cursor trail effect</p>
    </div>
  );
}
