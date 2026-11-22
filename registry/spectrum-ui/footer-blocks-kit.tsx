/**
 * Everything the footer blocks share: the icon set, the brand lockup, the
 * social row and the bottom bar.
 *
 * The earlier blocks inlined their own glyphs so each file copied out whole.
 * That stopped scaling once every footer needed the same wordmark, the same
 * three social marks and the same bottom bar: eighteen copies of the same
 * markup drift within a week. This ships alongside each block instead: the
 * registry item lists this file too, so one install writes both.
 *
 * Two icon styles live here on purpose:
 *
 *   - Utility icons (arrows, search, check, the rest) are **outline**. A
 *     filled arrow beside 13px text reads as a blob, and a filled chevron in a
 *     select looks like a warning triangle.
 *   - Social and brand marks are **solid**, because a logo drawn in outline is
 *     not that logo. These are the same paths the live site uses.
 */

import { cn } from '@/lib/utils';

type IconProps = React.SVGProps<SVGSVGElement>;

/* ── Outline utility icons ──────────────────────────────────
   One family, one grid, one stroke weight. 1.75 sits between the
   1.5 that reads correctly next to regular text and the 2 that a
   semibold label wants, which is the mix these footers run. */

function Outline({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />
    </Outline>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </Outline>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 19.5v-15M5.5 11 12 4.5l6.5 6.5" />
    </Outline>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Outline>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </Outline>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="11" cy="11" r="6.75" />
      <path d="m20 20-3.9-3.9" />
    </Outline>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Outline>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 5.5A2 2 0 0 0 13.5 3.5h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2" />
    </Outline>
  );
}

export function IconLocation(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M19.5 10.5c0 5.5-7.5 11-7.5 11s-7.5-5.5-7.5-11a7.5 7.5 0 0 1 15 0Z" />
      <circle cx="12" cy="10.3" r="2.6" />
    </Outline>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="m3.5 8 7.4 4.6a2 2 0 0 0 2.2 0L20.5 8" />
    </Outline>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M21 16.9v2.6a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3A19.2 19.2 0 0 1 4.4 13 19.5 19.5 0 0 1 1.4 4.4 2 2 0 0 1 3.4 2.2H6a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.4 2.1L7 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z" />
    </Outline>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 6.8V12l3.4 2" />
    </Outline>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 2.75 19.75 5.6v5.8c0 4.9-3.3 8.5-7.75 10.4C7.55 19.9 4.25 16.3 4.25 11.4V5.6L12 2.75Z" />
      <path d="m8.8 11.8 2.4 2.4 4.4-4.8" />
    </Outline>
  );
}

export function IconStar(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m12 3.5 2.72 5.5 6.08.89-4.4 4.28 1.04 6.05L12 17.36 6.56 20.22l1.04-6.05L3.2 9.89 9.28 9 12 3.5Z" />
    </Outline>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 3.2 13.9 9 19.7 10.9 13.9 12.8 12 18.6 10.1 12.8 4.3 10.9 10.1 9 12 3.2Z" />
    </Outline>
  );
}

export function IconEnter(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M9 10.5 5 14.5l4 4" />
      <path d="M5 14.5h10a4.5 4.5 0 0 0 4.5-4.5V5.5" />
    </Outline>
  );
}

/* ── Brand and social marks ─────────────────────────────────
   Solid, because a logo drawn in outline is not that logo. */

/** The brand mark: a neutral split-square glyph. */
export function BrandMark(props: IconProps) {
  return (
    <svg viewBox="0 0 36 36" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M0 8a8 8 0 0 1 8-8h20L0 28V8Z" />
      <path d="M36 28a8 8 0 0 1-8 8H8L36 8v20Z" />
    </svg>
  );
}

export function IconGitHub(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53v-1.86c-3.06.67-3.71-1.48-3.71-1.48-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.1.08 1.69 1.14 1.69 1.14.98 1.69 2.58 1.2 3.21.92.1-.72.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.45 0-1.2.43-2.19 1.14-2.96-.12-.28-.5-1.4.1-2.92 0 0 .93-.3 3.04 1.13a10.5 10.5 0 0 1 5.54 0c2.1-1.43 3.03-1.13 3.03-1.13.6 1.52.22 2.64.11 2.92.71.77 1.13 1.76 1.13 2.96 0 4.24-2.57 5.17-5.02 5.44.39.34.74 1.01.74 2.04v3.03c0 .29.2.64.76.53A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M714.163 519.284 1160.89 0H1055.03L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026Zm-145 168.544-47.468-67.894L144.011 79.694h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

/* ── Brand data ─────────────────────────────────────────────
   Real routes, so the previews link somewhere rather than to `#`. */

export const BRAND = {
  name: 'Northwind',
  tagline: 'The workspace where product teams plan, build and ship together.',
  url: 'https://northwind.dev',
  copyright: `© ${new Date().getFullYear()} Northwind Labs, Inc.`,
};

export interface FooterSocial {
  label: string;
  href: string;
  icon: React.ComponentType<IconProps>;
}

export const BRAND_SOCIALS: FooterSocial[] = [
  { label: 'GitHub', href: 'https://github.com', icon: IconGitHub },
  { label: 'X', href: 'https://x.com', icon: IconX },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: IconLinkedIn },
];

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}

export const BRAND_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '#' },
      { label: 'Roadmaps', href: '#' },
      { label: 'Issues', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Insights', href: '#', badge: 'New' },
      { label: 'Integrations', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Quickstart', href: '#' },
      { label: 'API reference', href: '#' },
      { label: 'CLI', href: '#' },
      { label: 'Webhooks', href: '#' },
      { label: 'SDKs', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Customer stories', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Brand kit', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export const BRAND_LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
  { label: 'Status', href: '#' },
];

/* ── Shared pieces ──────────────────────────────────────────
   `tone="dark"` is for the blocks that are dark in both themes, where
   `dark:` variants never fire and the light palette would be unreadable. */

export type FooterTone = 'auto' | 'dark';

/** The mark and the wordmark, locked up. */
export function BrandLockup({
  brand = BRAND.name,
  href = '/',
  tone = 'auto',
  className,
}: {
  brand?: string;
  href?: string;
  tone?: FooterTone;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md transition-opacity duration-150 hover:opacity-70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
        className,
      )}
    >
      <span
        className={cn(
          'grid size-7 shrink-0 place-items-center rounded-[7px]',
          tone === 'dark'
            ? 'bg-neutral-100 text-neutral-900'
            : 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900',
        )}
      >
        <BrandMark className="size-3.5" />
      </span>
      <span className="whitespace-nowrap text-[14.5px] font-semibold tracking-[-0.3px]">
        {brand}
      </span>
    </a>
  );
}

/** The social row. Solid marks, 32px hit area, one hover transition. */
export function FooterSocials({
  socials = BRAND_SOCIALS,
  tone = 'auto',
  className,
}: {
  socials?: FooterSocial[];
  tone?: FooterTone;
  className?: string;
}) {
  if (socials.length === 0) return null;
  return (
    <ul className={cn('flex items-center gap-0.5', className)}>
      {socials.map(({ label, href, icon: Glyph }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className={cn(
              'grid size-8 place-items-center rounded-lg transition-[color,background-color] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
              tone === 'dark'
                ? 'text-neutral-400 hover:bg-white/[0.07] hover:text-neutral-100'
                : 'text-neutral-400 hover:bg-black/[0.05] hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-white/[0.07] dark:hover:text-neutral-100',
            )}
          >
            <Glyph className="size-[15px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The bottom bar every footer ends on: lockup and copyright left, utility links
 * and social marks right. One component rather than eighteen hand-rolled
 * copies, which is the only way they stay identical.
 */
export function FooterBar({
  brand = BRAND.name,
  copyright,
  links = BRAND_LEGAL,
  socials = BRAND_SOCIALS,
  tone = 'auto',
  showLockup = true,
  className,
}: {
  brand?: string;
  copyright?: string;
  links?: { label: string; href: string }[];
  socials?: FooterSocial[];
  tone?: FooterTone;
  showLockup?: boolean;
  className?: string;
}) {
  const muted = tone === 'dark' ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400';
  const hover =
    tone === 'dark'
      ? 'hover:text-neutral-100'
      : 'hover:text-neutral-900 dark:hover:text-neutral-100';
  const rule =
    tone === 'dark' ? 'border-white/[0.08]' : 'border-black/[0.07] dark:border-white/[0.08]';

  return (
    <div className={cn('border-t pt-6', rule, className)}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {showLockup && <BrandLockup brand={brand} tone={tone} />}
          <p className={cn('text-[12px] tabular-nums', muted)}>{copyright ?? BRAND.copyright}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px]', muted)}>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    'transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                    hover,
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <FooterSocials socials={socials} tone={tone} className="-mr-2" />
        </div>
      </div>
    </div>
  );
}
