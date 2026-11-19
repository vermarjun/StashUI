"use client";

import OrbitImages from "@/registry/react-bits/OrbitImages";

const PHOTOS = [
  "photo-1506792006437-256b665541e2",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1506905925346-21bda4d32df4",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1507525428034-b723cf961d3e",
  "photo-1508193638397-1c4234db14d8",
  "photo-1508739773434-c26b3d09e071",
  "photo-1508873881324-c92a3fc536ba",
];
const photo = (i: number, w: number, h: number) =>
  `https://images.unsplash.com/${PHOTOS[Math.abs(i) % PHOTOS.length]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const IMAGES = Array.from(
  { length: 8 },
  (_, i) => photo(i, 200, 200),
);

export default function Demo() {
  return (
    <OrbitImages
      images={IMAGES}
      shape="ellipse"
      baseWidth={640}
      width={640}
      height={640}
      radiusX={290}
      radiusY={110}
      rotation={-8}
      duration={30}
      itemSize={84}
      fill
      showPath
      pathColor="rgba(150,150,150,0.35)"
      pathWidth={1.5}
      centerContent={
        <div className="text-center">
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            Orbit Images
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Any shape, any path, endlessly looping
          </p>
        </div>
      }
    />
  );
}
