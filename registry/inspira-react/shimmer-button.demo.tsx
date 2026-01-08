"use client";
import { ShimmerButton } from "@/registry/inspira-react/shimmer-button";

export default function ShimmerButtonDemo() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <ShimmerButton shimmerColor="#ffffff" background="rgba(0,0,0,1)">
        Shimmer Button
      </ShimmerButton>
      <ShimmerButton
        shimmerColor="#a78bfa"
        background="rgba(109, 40, 217, 1)"
        borderRadius="8px"
        shimmerDuration="2s"
      >
        Purple Shimmer
      </ShimmerButton>
    </div>
  );
}
