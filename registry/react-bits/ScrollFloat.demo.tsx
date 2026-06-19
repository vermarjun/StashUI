"use client";
import ScrollFloat from "@/registry/react-bits/ScrollFloat";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-[700px] py-24 gap-8 bg-background">
      <ScrollFloat
        containerClassName="text-center"
        textClassName="text-foreground font-bold"
      >
        Scroll to reveal
      </ScrollFloat>
      <ScrollFloat
        containerClassName="text-center"
        textClassName="text-muted-foreground"
        stagger={0.04}
        animationDuration={1.2}
      >
        each character floats up
      </ScrollFloat>
      <ScrollFloat
        containerClassName="text-center"
        textClassName="text-foreground"
        stagger={0.025}
        ease="back.out(1.7)"
      >
        as you scroll the page
      </ScrollFloat>
    </div>
  );
}
