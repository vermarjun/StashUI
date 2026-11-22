"use client";

import SpecularButton from "./specular-button";

export default function SpecularButtonDemo() {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center gap-6 bg-black p-8">
      <SpecularButton size="lg">Get started</SpecularButton>
      <SpecularButton size="lg" tint="#a5b4fc" lineColor="#c7d2fe" baseColor="#3730a3">
        Book a demo
      </SpecularButton>
    </div>
  );
}
