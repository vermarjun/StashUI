"use client";
import ShinyText from "@/registry/react-bits/ShinyText";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-6 p-8">
      <ShinyText
        className="font-semibold text-5xl tracking-tight"
        color="color-mix(in oklab, var(--foreground) 45%, transparent)"
        shineColor="var(--foreground)"
        speed={2.5}
        spread={100}
        text="Shine bright like a component."
      />
      <ShinyText
        className="font-medium text-xl"
        color="color-mix(in oklab, var(--foreground) 35%, transparent)"
        delay={1}
        shineColor="var(--foreground)"
        speed={3}
        spread={80}
        text="Light moves. Text stays."
      />
    </div>
  );
}
