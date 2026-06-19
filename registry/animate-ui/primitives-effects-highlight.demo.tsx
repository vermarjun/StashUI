'use client';

import { Highlight, HighlightItem } from '@/registry/animate-ui/primitives-effects-highlight';

const items = ['Dashboard', 'Analytics', 'Settings', 'Profile', 'Help'];

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <Highlight
        hover
        className="rounded-md bg-muted"
        mode="parent"
        controlledItems
        containerClassName="flex gap-1 rounded-lg border border-border p-1"
      >
        {items.map((item) => (
          <HighlightItem key={item} value={item} asChild>
            <button
              type="button"
              className="relative z-10 rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors"
            >
              {item}
            </button>
          </HighlightItem>
        ))}
      </Highlight>
    </div>
  );
}
