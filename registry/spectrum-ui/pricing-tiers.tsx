'use client';

/**
 * Spectrum UI: Pricing tiers
 *
 * Four three-tier pricing layouts from the Spectrum UI pricing collection
 * behind one `variant` prop: a banner grid with a yearly/monthly switch and
 * rolling price digits, tinted gradient columns, staggered offset cards and a
 * set of printed receipts. Each layout is also exported on its own and takes
 * the same `Plan[]` shape.
 */

import { BannerTiers, type BannerTiersProps } from './pricing-tiers-banner';
import { GradientTiers, type GradientTiersProps } from './pricing-tiers-gradient';
import { OffsetTiers, type OffsetTiersProps } from './pricing-tiers-offset';
import { ReceiptTiers, type ReceiptTiersProps } from './pricing-tiers-receipt';
import type { Plan } from './pricing-tiers-types';

export { BannerTiers, GradientTiers, OffsetTiers, ReceiptTiers };
export type { BannerTiersProps, GradientTiersProps, OffsetTiersProps, ReceiptTiersProps };
export { PriceFigure } from './pricing-tiers-price-figure';
export type * from './pricing-tiers-types';

export type PricingTiersVariant = 'banner' | 'gradient' | 'offset' | 'receipt';

export const DEFAULT_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For solo builders shipping their first product.',
    price: { monthly: 12, annual: 9 },
    cta: 'Start free trial',
    features: ['3 projects', '10k monthly events', 'Email support', 'Community templates'],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For teams that need more seats, more data and fewer limits.',
    price: { monthly: 49, annual: 39 },
    cta: 'Upgrade to Growth',
    featured: true,
    badge: 'Popular',
    inherits: 'Starter',
    features: ['Unlimited projects', '1M monthly events', 'Priority support', 'Audit log'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For organisations with security and procurement needs.',
    price: null,
    cta: 'Talk to sales',
    inherits: 'Growth',
    features: ['SAML SSO & SCIM', 'Custom data retention', 'Dedicated manager', '99.99% uptime SLA'],
  },
];

export interface PricingTiersProps {
  variant?: PricingTiersVariant;
  plans?: Plan[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
}

export function PricingTiers({
  variant = 'banner',
  plans = DEFAULT_PLANS,
  eyebrow = 'Pricing',
  heading = 'Simple plans that grow with your team',
  subheading = 'Start free for 14 days. No card required, cancel any time.',
  className,
}: PricingTiersProps) {
  if (variant === 'gradient') {
    return (
      <GradientTiers
        plans={plans}
        eyebrow={eyebrow}
        heading={heading}
        subheading={subheading}
        notes={plans.map((plan) => ({
          price: plan.price ? `$${plan.price.annual} / mo` : undefined,
          priceNote: plan.price ? 'per seat, billed yearly' : 'Volume discounts',
        }))}
        className={className}
      />
    );
  }

  if (variant === 'offset') {
    return (
      <OffsetTiers
        plans={plans}
        eyebrow={eyebrow}
        heading={heading}
        subheading={subheading}
        className={className}
      />
    );
  }

  if (variant === 'receipt') {
    return (
      <ReceiptTiers
        plans={plans}
        eyebrow={eyebrow}
        heading={heading}
        subheading={subheading}
        merchant="NORTHWIND LABS INC."
        merchantLine="548 MARKET ST · SAN FRANCISCO"
        className={className}
      />
    );
  }

  return <BannerTiers plans={plans} eyebrow={eyebrow} heading={heading} className={className} />;
}

export default PricingTiers;
