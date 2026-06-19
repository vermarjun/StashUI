"use client";
import { DitherShader } from "@/registry/aceternity-ui/dither-shader";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 bg-background p-8">
      <div className="flex flex-col gap-2 items-center">
        <DitherShader
          src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop"
          ditherMode="bayer"
          colorMode="grayscale"
          gridSize={4}
          className="w-[280px] h-[200px] rounded-xl overflow-hidden"
        />
        <span className="text-xs text-muted-foreground">bayer · grayscale</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <DitherShader
          src="https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=800&auto=format&fit=crop"
          ditherMode="halftone"
          colorMode="duotone"
          primaryColor="#1a1a2e"
          secondaryColor="#0ea5e9"
          gridSize={6}
          className="w-[280px] h-[200px] rounded-xl overflow-hidden"
        />
        <span className="text-xs text-muted-foreground">halftone · duotone</span>
      </div>
    </div>
  );
}
