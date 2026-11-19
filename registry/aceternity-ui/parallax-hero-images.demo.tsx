"use client";
import { ParallaxHeroImages } from "@/registry/aceternity-ui/parallax-hero-images";

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=640&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1506097425191-7ad538b29cef?w=640&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=640&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1498019559366-a1cbd07b5160?w=640&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=640&h=480&fit=crop&auto=format&q=80",
];

export default function Demo() {
  return (
    <div className="relative h-[800px] w-full overflow-hidden bg-background">
      <ParallaxHeroImages images={images} />
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            Moodboard, spring edition
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Collect what
            <br />
            moves you.
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Save photos, products and references from anywhere, and keep them
            in one calm, shareable board.
          </p>
        </div>
      </div>
    </div>
  );
}
