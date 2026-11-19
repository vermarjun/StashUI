'use client';

import { Highlight, HighlightItem } from '@/registry/animate-ui/primitives-effects-highlight';

const items = ['Overview', 'Analytics', 'Customers', 'Billing', 'Settings'];

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <header className="flex w-full max-w-4xl items-center justify-between rounded-2xl border border-border bg-card px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-foreground" />
          <span className="text-base font-semibold text-foreground">Northwind</span>
        </div>
        <Highlight
          hover
          className="rounded-lg bg-muted"
          mode="parent"
          controlledItems
          containerClassName="flex gap-1"
        >
          {items.map((item) => (
            <HighlightItem key={item} value={item} asChild>
              <button
                type="button"
                className="relative z-10 rounded-lg px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </button>
            </HighlightItem>
          ))}
        </Highlight>
        <img
          src="https://i.pravatar.cc/80?img=47"
          alt="Account"
          className="size-9 rounded-full border border-border"
        />
      </header>
    </div>
  );
}
