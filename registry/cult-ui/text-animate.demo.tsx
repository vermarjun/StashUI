"use client";

import TextAnimate from "@/registry/cult-ui/text-animate";

export default function Demo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[300px] bg-white dark:bg-neutral-900 rounded-lg p-8">
      <TextAnimate text="Hello World" type="whipInUp" />
      <TextAnimate text="Beautiful Animation" type="fadeInUp" />
      <TextAnimate text="Smooth and Fluid" type="calmInUp" />
    </div>
  );
}
