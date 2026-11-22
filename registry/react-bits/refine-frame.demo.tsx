"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import RefineFrame, { type RefineFrameStatus } from "@/registry/react-bits/refine-frame";

const ORDER: RefineFrameStatus[] = ["queued", "generating", "refining", "complete"];

export default function Demo() {
  const [step, setStep] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (step >= ORDER.length - 1) return;
    timer.current = setTimeout(() => setStep(s => s + 1), step === 0 ? 700 : 1500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [step]);

  return (
    <div className="flex min-h-[560px] w-full flex-col items-center justify-center gap-5 bg-background px-6">
      <p className="max-w-[340px] text-center text-sm text-muted-foreground">
        &ldquo;Alpine lake at dawn, mist over the water, soft film grain&rdquo;
      </p>
      <RefineFrame status={ORDER[step]} width={340} aspectRatio="4 / 3">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
          alt="Mountains above a sea of clouds"
          className="h-full w-full object-cover"
        />
      </RefineFrame>
      <Button variant="outline" size="sm" onClick={() => setStep(0)}>
        Regenerate
      </Button>
    </div>
  );
}
