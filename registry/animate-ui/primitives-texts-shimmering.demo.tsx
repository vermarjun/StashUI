'use client';

import { ShimmeringText } from '@/registry/animate-ui/primitives-texts-shimmering';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full p-10">
      <ShimmeringText
        text="Shimmer across every letter"
        className="text-3xl font-bold"
      />
      <ShimmeringText
        text="Wave through the words"
        wave
        duration={1.5}
        className="text-2xl font-medium"
      />
    </div>
  );
}
