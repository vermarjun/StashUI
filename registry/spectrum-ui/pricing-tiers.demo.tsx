'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PricingTiers, type PricingTiersVariant } from './pricing-tiers';

const VARIANTS: { id: PricingTiersVariant; label: string }[] = [
  { id: 'banner', label: 'Banner' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'offset', label: 'Offset' },
  { id: 'receipt', label: 'Receipt' },
];

export default function PricingTiersDemo() {
  const [variant, setVariant] = useState<PricingTiersVariant>('banner');

  return (
    <div className="w-full bg-background">
      <div className="sticky top-0 z-20 flex justify-center bg-background/80 py-3 backdrop-blur">
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
      <div className="mx-auto w-full max-w-[1120px] px-4 pb-12">
        <PricingTiers key={variant} variant={variant} />
      </div>
    </div>
  );
}
