"use client";

import { Compare } from "@/registry/inspira-react/compare";

export default function CompareDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <Compare
        firstImage="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800"
        secondImage="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800"
        firstImageAlt="Day scene"
        secondImageAlt="Night scene"
        slideMode="hover"
        showHandlebar
        className="h-[400px] w-[600px] rounded-2xl"
      />
    </div>
  );
}
