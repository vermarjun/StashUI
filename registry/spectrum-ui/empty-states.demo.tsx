'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { EmptyStates, type EmptyStatesVariant } from './empty-states';

const VARIANTS: { id: EmptyStatesVariant; label: string }[] = [
  { id: 'search', label: 'Search' },
  { id: 'chart', label: 'Chart' },
  { id: 'inbox', label: 'Inbox' },
  { id: 'upload', label: 'Upload' },
  { id: 'project', label: 'Project' },
  { id: 'activity', label: 'Activity' },
];

export default function EmptyStatesDemo() {
  const [variant, setVariant] = useState<EmptyStatesVariant>('search');

  return (
    <div className="flex w-full flex-col items-center gap-6 bg-background px-4 py-8">
      <div className="inline-flex flex-wrap justify-center rounded-full border border-border bg-muted/40 p-1">
        {VARIANTS.map((item) => (
          <button
            key={item.id}
            type="button"
            data-variant={item.id}
            onClick={() => setVariant(item.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors',
              variant === item.id
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="w-full max-w-[640px]">
        <EmptyStates key={variant} variant={variant} />
      </div>
    </div>
  );
}
