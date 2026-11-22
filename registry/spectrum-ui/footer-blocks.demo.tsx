'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FooterBlocks, type FooterBlocksVariant } from './footer-blocks';

const VARIANTS: { id: FooterBlocksVariant; label: string }[] = [
  { id: 'sitemap', label: 'Sitemap' },
  { id: 'search', label: 'Link search' },
  { id: 'contact', label: 'Contact' },
  { id: 'minimal', label: 'Minimal' },
];

export default function FooterBlocksDemo() {
  const [variant, setVariant] = useState<FooterBlocksVariant>('sitemap');

  return (
    <div className="flex min-h-[760px] w-full flex-col justify-end bg-background">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-8">
        <p className="text-sm text-muted-foreground">Page content ends here. Pick a footer:</p>
        <div className="inline-flex rounded-full border border-border bg-muted/40 p-1">
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
      </div>
      <FooterBlocks key={variant} variant={variant} />
    </div>
  );
}
