"use client";
import GridDistortion from "@/registry/react-bits/GridDistortion";

export default function Demo() {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: "560px" }}>
      <GridDistortion
        imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&auto=format&q=80"
        grid={15}
        mouse={0.15}
        strength={0.2}
        relaxation={0.9}
        className="w-full h-full"
      />
    </div>
  );
}
