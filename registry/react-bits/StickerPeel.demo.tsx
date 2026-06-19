"use client";
import Cmp from "@/registry/react-bits/StickerPeel";

export default function Demo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <Cmp
        imageSrc="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&h=300&fit=crop&auto=format"
        width={200}
        rotate={15}
        peelBackHoverPct={30}
        peelBackActivePct={45}
        initialPosition="center"
      />
    </div>
  );
}
