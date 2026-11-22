"use client";

import { SvgPathMorphing } from "./svg-path-morphing";

export default function SvgPathMorphingDemo() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-10 rounded-3xl border border-border bg-card px-10 py-8 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
          alt="Album cover"
          className="size-24 rounded-xl object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="text-lg font-medium text-foreground">Summit Light</span>
          <span className="text-sm text-muted-foreground">Nils Aurora · 3:42</span>
        </div>
        <SvgPathMorphing size={72} />
      </div>
      <p className="text-sm text-muted-foreground">Tap to morph pause into play</p>
    </div>
  );
}
