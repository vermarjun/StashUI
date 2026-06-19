"use client";
import GridDistortion from "@/registry/react-bits/GridDistortion";

export default function Demo() {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: "560px" }}>
      <GridDistortion
        imageSrc="https://picsum.photos/seed/grid-distort/1200/800"
        grid={15}
        mouse={0.15}
        strength={0.2}
        relaxation={0.9}
        className="w-full h-full"
      />
    </div>
  );
}
