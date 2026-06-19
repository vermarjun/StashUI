"use client";
import Cmp from "@/registry/react-bits/OrbitImages";

const IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&h=80&fit=crop&auto=format",
];

export default function Demo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <Cmp
        images={IMAGES}
        shape="ellipse"
        radiusX={280}
        radiusY={80}
        rotation={-8}
        duration={18}
        itemSize={64}
        fill
        width={680}
        height={240}
        showPath
        pathColor="rgba(128,128,128,0.2)"
        pathWidth={1}
        centerContent={
          <span className="text-muted-foreground text-xs tracking-widest uppercase opacity-60">
            my/ui orbit
          </span>
        }
      />
    </div>
  );
}
