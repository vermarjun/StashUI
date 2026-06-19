"use client";
import { Lens } from "@/registry/aceternity-ui/lens";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-8">
      <div className="w-[480px] max-w-full">
        <Lens zoomFactor={1.8} lensSize={160}>
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop"
            alt="Forest landscape"
            width={480}
            height={320}
            className="block rounded-xl w-full object-cover"
            style={{ aspectRatio: "3/2" }}
          />
        </Lens>
        <p className="mt-3 text-sm text-muted-foreground text-center">
          Move cursor over the image to magnify
        </p>
      </div>
    </div>
  );
}
