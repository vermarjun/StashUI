'use client';

import * as React from 'react';

import {
  ScrollingNumberContainer,
  ScrollingNumber,
  ScrollingNumberHighlight,
  ScrollingNumberItems,
} from '@/registry/animate-ui/primitives-texts-scrolling-number';

const fade: React.CSSProperties = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
};

const fadeX: React.CSSProperties = {
  maskImage:
    'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
  WebkitMaskImage:
    'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
};

const weeks = [
  { label: 'This week', downloads: 1400, rating: 48 },
  { label: 'Last week', downloads: 900, rating: 45 },
  { label: 'Launch week', downloads: 2300, rating: 52 },
];

export default function Demo() {
  const [week, setWeek] = React.useState(0);
  const w = weeks[week];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 p-10">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">Downloads</p>
          <ScrollingNumberContainer
            key={`d-${week}`}
            number={w.downloads}
            step={100}
            itemsSize={56}
            sideItemsCount={2}
            direction="btt"
            inView
            className="w-48 text-4xl font-bold tabular-nums"
            style={fade}
          >
            <ScrollingNumberHighlight className="w-full rounded-xl border border-border bg-muted" />
            <ScrollingNumber delay={150}>
              <ScrollingNumberItems className="flex shrink-0 items-center justify-center text-foreground" />
            </ScrollingNumber>
          </ScrollingNumberContainer>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">Countries</p>
          <ScrollingNumberContainer
            key={`r-${week}`}
            number={w.rating}
            step={1}
            itemsSize={64}
            sideItemsCount={2}
            direction="rtl"
            inView
            className="h-14 text-2xl font-semibold tabular-nums"
            style={fadeX}
          >
            <ScrollingNumberHighlight className="h-full rounded-xl border border-border bg-muted" />
            <ScrollingNumber delay={300}>
              <ScrollingNumberItems className="flex shrink-0 items-center justify-center text-foreground" />
            </ScrollingNumber>
          </ScrollingNumberContainer>
        </div>
      </div>

      <div className="flex gap-2">
        {weeks.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setWeek(i)}
            className={
              'rounded-full border px-4 py-1.5 text-sm transition-colors ' +
              (i === week
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:text-foreground')
            }
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
