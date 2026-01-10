'use client';

import { Slot } from '@/registry/animate-ui/primitives-animate-slot';

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full p-8 gap-6">
      <Slot
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-neutral-100 dark:bg-neutral-800 px-6 py-3 font-semibold text-base"
      >
        <div>Animated with Slot</div>
      </Slot>

      <Slot
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-full bg-blue-500 text-white px-5 py-2 text-sm font-medium"
      >
        <button type="button">Click me</button>
      </Slot>
    </div>
  );
}
