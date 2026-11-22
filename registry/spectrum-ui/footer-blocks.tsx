'use client';

/**
 * Spectrum UI: Footer blocks
 *
 * Four footer layouts from the Spectrum UI footer collection behind one
 * `variant` prop: a mega sitemap with region/language selectors, a link-search
 * footer that filters every page as you type, a contact footer with copy-to-
 * clipboard rows and a live local clock, and a minimal bar whose link clusters
 * open in popovers. Each layout is also exported on its own.
 */

import { BRAND, BRAND_GROUPS, BRAND_LEGAL, BRAND_SOCIALS } from './footer-blocks-kit';
import { ContactCardFooter, type ContactCardFooterProps } from './footer-blocks-contact';
import { LinkSearchFooter, type LinkSearchFooterProps } from './footer-blocks-search';
import { MinimalFooter, type MinimalFooterProps } from './footer-blocks-minimal';
import { MegaSitemapFooter, type MegaSitemapFooterProps } from './footer-blocks-sitemap';

export { ContactCardFooter, LinkSearchFooter, MinimalFooter, MegaSitemapFooter };
export type { ContactCardFooterProps, LinkSearchFooterProps, MinimalFooterProps, MegaSitemapFooterProps };
export * from './footer-blocks-kit';

export type FooterBlocksVariant = 'sitemap' | 'search' | 'contact' | 'minimal';

export interface FooterBlocksProps {
  variant?: FooterBlocksVariant;
  brand?: string;
  className?: string;
}

export function FooterBlocks({ variant = 'sitemap', brand = BRAND.name, className }: FooterBlocksProps) {
  if (variant === 'search') {
    return (
      <LinkSearchFooter
        brand={brand}
        groups={BRAND_GROUPS}
        links={BRAND_LEGAL}
        socials={BRAND_SOCIALS}
        copyright={BRAND.copyright}
        className={className}
      />
    );
  }

  if (variant === 'contact') {
    return (
      <ContactCardFooter
        brand={brand}
        email="hello@northwind.dev"
        phone="+1 (415) 555-0132"
        address="548 Market St, San Francisco, CA"
        hours="Mon–Fri, 9:00–18:00 PT"
        utcOffset={-8}
        links={BRAND_LEGAL}
        socials={BRAND_SOCIALS}
        copyright={BRAND.copyright}
        className={className}
      />
    );
  }

  if (variant === 'minimal') {
    return (
      <MinimalFooter
        brand={brand}
        clusters={BRAND_GROUPS.map((group) => ({ title: group.title, links: group.links }))}
        socials={BRAND_SOCIALS}
        copyright={BRAND.copyright}
        className={className}
      />
    );
  }

  return (
    <MegaSitemapFooter
      brand={brand}
      tagline={BRAND.tagline}
      columns={BRAND_GROUPS.map((group) => ({ groups: [group] }))}
      legal={BRAND_LEGAL}
      socials={BRAND_SOCIALS}
      regions={['United States', 'United Kingdom', 'Germany', 'Japan']}
      languages={['English', 'Deutsch', '日本語']}
      newsletter={{
        eyebrow: 'Product updates',
        blurb: 'One email a month with what shipped, what is next and nothing else.',
        cta: 'Subscribe',
      }}
      copyright={BRAND.copyright}
      className={className}
    />
  );
}

export default FooterBlocks;
