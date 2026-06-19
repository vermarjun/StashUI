"use client";
import Shuffle from "@/registry/react-bits/Shuffle";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[340px] bg-background p-8">
      <Shuffle
        text="SHUFFLE"
        tag="h2"
        className="text-foreground text-5xl tracking-widest"
        shuffleDirection="up"
        duration={0.35}
        stagger={0.03}
        shuffleTimes={2}
        triggerOnHover
        loop={false}
      />
    </div>
  );
}
