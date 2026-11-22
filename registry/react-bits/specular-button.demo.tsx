"use client";

import SpecularButton from "./specular-button";

export default function SpecularButtonDemo() {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center gap-10 p-8">
      <SpecularButton size="lg" radius={24} className="px-14! py-7! text-2xl!">
        Get started
      </SpecularButton>
      <SpecularButton
        size="lg"
        radius={24}
        className="px-14! py-7! text-2xl!"
        tint="#a5b4fc"
        lineColor="#c7d2fe"
        baseColor="#3730a3"
      >
        Book a demo
      </SpecularButton>
    </div>
  );
}
