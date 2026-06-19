"use client";
import Cmp from "@/registry/react-bits/TextCursor";

export default function Demo() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <p className="text-muted-foreground text-sm tracking-widest uppercase opacity-40">
          move cursor here
        </p>
      </div>
      <Cmp text="✦" spacing={80} maxPoints={8} followMouseDirection randomFloat exitDuration={0.6} />
    </div>
  );
}
