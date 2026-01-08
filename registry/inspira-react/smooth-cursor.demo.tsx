"use client";
import { SmoothCursor } from "@/registry/inspira-react/smooth-cursor";

export default function SmoothCursorDemo() {
  return (
    <div className="relative flex h-64 w-full items-center justify-center rounded-lg border bg-background">
      <SmoothCursor />
      <p className="text-sm text-muted-foreground">Move your mouse to see the smooth cursor</p>
    </div>
  );
}
