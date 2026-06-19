"use client";
import SplitText from "@/registry/react-bits/SplitText";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[360px] gap-6 p-12 bg-background">
      <SplitText
        text="Every letter has a story."
        tag="h2"
        className="text-4xl font-bold text-foreground"
        splitType="chars"
        duration={1.1}
        delay={40}
        from={{ opacity: 0, y: 50 }}
        to={{ opacity: 1, y: 0 }}
      />
      <SplitText
        text="Watch them arrive one by one."
        tag="p"
        className="text-xl text-muted-foreground"
        splitType="words"
        duration={0.9}
        delay={80}
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
      />
    </div>
  );
}
