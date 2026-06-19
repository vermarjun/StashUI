"use client";
import { PixelatedCanvas } from "@/registry/aceternity-ui/pixelated-canvas";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center gap-4">
        <PixelatedCanvas
          src="https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=800&auto=format&fit=crop"
          width={480}
          height={320}
          cellSize={4}
          dotScale={0.85}
          shape="circle"
          distortionMode="swirl"
          distortionStrength={6}
          distortionRadius={100}
          interactive={true}
          fadeOnLeave={true}
          backgroundColor="#0a0a0a"
          className="rounded-xl overflow-hidden"
        />
        <p className="text-sm text-muted-foreground">
          Move cursor over the canvas to distort
        </p>
      </div>
    </div>
  );
}
