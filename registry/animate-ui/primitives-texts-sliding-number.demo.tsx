'use client';

import * as React from 'react';
import { SlidingNumber } from '@/registry/animate-ui/primitives-texts-sliding-number';

export default function Demo() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const targets = [1234, 5678, 9999, 42, 3141];
    let i = 0;
    const tick = () => {
      i = (i + 1) % targets.length;
      setCount(targets[i]!);
    };
    const id = setInterval(tick, 1800);
    tick();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full p-10">
      <div className="text-center">
        <SlidingNumber
          number={count}
          fromNumber={0}
          initiallyStable
          inView
          className="text-6xl font-bold tabular-nums"
        />
        <p className="text-sm text-muted-foreground mt-2">Sliding digits</p>
      </div>

      <div className="flex gap-8">
        <div className="text-center">
          <SlidingNumber
            number={count}
            fromNumber={0}
            initiallyStable
            inView
            thousandSeparator=","
            className="text-3xl font-semibold tabular-nums"
          />
          <p className="text-xs text-muted-foreground mt-1">with separator</p>
        </div>
        <div className="text-center">
          <SlidingNumber
            number={count / 100}
            fromNumber={0}
            initiallyStable
            inView
            decimalPlaces={2}
            className="text-3xl font-semibold tabular-nums"
          />
          <p className="text-xs text-muted-foreground mt-1">decimal</p>
        </div>
      </div>
    </div>
  );
}
