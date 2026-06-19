'use client';

import {
  ScrollingNumberContainer,
  ScrollingNumber,
  ScrollingNumberHighlight,
  ScrollingNumberItems,
} from '@/registry/animate-ui/primitives-texts-scrolling-number';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full p-10">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">Downloads</p>
        <ScrollingNumberContainer
          number={500}
          step={100}
          itemsSize={48}
          sideItemsCount={2}
          direction="btt"
          inView
          className="text-4xl font-bold tabular-nums"
        >
          <ScrollingNumberHighlight className="bg-primary/10 rounded" />
          <ScrollingNumber />
          <ScrollingNumberItems
            className="flex items-center justify-center font-bold text-foreground"
          />
        </ScrollingNumberContainer>
      </div>

      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Stars</p>
          <ScrollingNumberContainer
            number={1000}
            step={200}
            itemsSize={36}
            sideItemsCount={2}
            direction="btt"
            inView
            delay={300}
            className="text-2xl font-semibold tabular-nums"
          >
            <ScrollingNumberHighlight className="bg-muted rounded" />
            <ScrollingNumber />
            <ScrollingNumberItems className="flex items-center justify-center text-foreground" />
          </ScrollingNumberContainer>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Components</p>
          <ScrollingNumberContainer
            number={80}
            step={20}
            itemsSize={36}
            sideItemsCount={2}
            direction="ttb"
            inView
            delay={600}
            className="text-2xl font-semibold tabular-nums"
          >
            <ScrollingNumberHighlight className="bg-muted rounded" />
            <ScrollingNumber />
            <ScrollingNumberItems className="flex items-center justify-center text-foreground" />
          </ScrollingNumberContainer>
        </div>
      </div>
    </div>
  );
}
