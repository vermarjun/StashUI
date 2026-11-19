"use client";
import { PixelatedCanvas } from "@/registry/aceternity-ui/pixelated-canvas";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-6">
      <div className="flex flex-col items-center gap-4">
        <PixelatedCanvas
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=660&fit=crop&auto=format&q=80"
          width={760}
          height={500}
          cellSize={5}
          dotScale={0.85}
          shape="circle"
          distortionMode="swirl"
          dropoutStrength={0.15}
          distortionStrength={14}
          distortionRadius={160}
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
