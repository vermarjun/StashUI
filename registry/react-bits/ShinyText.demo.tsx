"use client";
import ShinyText from "@/registry/react-bits/ShinyText";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px] gap-6 bg-background p-8">
      <ShinyText
        text="Shine bright like a component."
        speed={2.5}
        className="text-3xl font-semibold tracking-tight"
        color="hsl(var(--muted-foreground))"
        shineColor="hsl(var(--foreground))"
        spread={100}
      />
      <ShinyText
        text="Light moves. Text stays."
        speed={3}
        className="text-xl font-medium"
        color="hsl(var(--muted-foreground) / 0.7)"
        shineColor="hsl(var(--foreground))"
        spread={80}
        delay={1}
      />
    </div>
  );
}
