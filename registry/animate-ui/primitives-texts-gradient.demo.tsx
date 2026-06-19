'use client';

import { GradientText } from '@/registry/animate-ui/primitives-texts-gradient';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full p-10">
      <GradientText
        text="Beautiful animations"
        className="text-4xl font-bold tracking-tight"
      />
      <GradientText
        text="made effortless"
        neon
        className="text-3xl font-semibold tracking-tight"
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
