'use client';

import { RollingText } from '@/registry/animate-ui/primitives-texts-rolling';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full p-10">
      <RollingText
        text="Welcome to Animate UI"
        inView
        className="text-3xl font-bold"
      />
      <RollingText
        text="Beautiful animations made easy"
        inView
        delay={300}
        className="text-xl text-neutral-500"
      />
    </div>
  );
}
