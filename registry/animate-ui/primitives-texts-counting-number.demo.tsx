'use client';

import { CountingNumber } from '@/registry/animate-ui/primitives-texts-counting-number';

export default function Demo() {
  return (
    <div className="flex items-center justify-center gap-12 w-full p-10">
      <div className="text-center">
        <CountingNumber
          number={1234}
          inView
          className="text-4xl font-bold tabular-nums"
        />
        <p className="text-sm text-neutral-500 mt-1">Users</p>
      </div>
      <div className="text-center">
        <CountingNumber
          number={98.6}
          decimalPlaces={1}
          inView
          className="text-4xl font-bold tabular-nums"
        />
        <p className="text-sm text-neutral-500 mt-1">Score</p>
      </div>
      <div className="text-center">
        <CountingNumber
          number={5000}
          fromNumber={0}
          inView
          className="text-4xl font-bold tabular-nums"
        />
        <p className="text-sm text-neutral-500 mt-1">Downloads</p>
      </div>
    </div>
  );
}
