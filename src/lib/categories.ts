// The component taxonomy + per-type display tuning.
//
// `cols`: cards per row at desktop.
// `designWidth`: the viewport width (px) the component renders at inside its
//                 iframe before being scaled to fit the card. Small UI (buttons)
//                 use a small width so they're not shrunk to nothing; big blocks
//                 (heroes, backgrounds) use a desktop width and scale down to
//                 fit. The preview box is always 16:10 and the frame is scaled
//                 uniformly, so nothing ever overflows.

export type CategoryGroup = "type" | "use";

export interface CategoryConfig {
  slug: string;
  label: string;
  /** "type" = what it is (Buttons); "use" = where you'd use it (Sign in). */
  group: CategoryGroup;
  cols: 1 | 2 | 3 | 4;
  designWidth: number;
}

// A component lists several slugs in registry/categories.json; the first is
// its primary TYPE (badge + home row), the rest are extra types / use cases.
export const CATEGORY_CONFIG: CategoryConfig[] = [
  // ── Types: what it is ───────────────────────────────────────────────────
  { slug: "buttons", label: "Buttons", group: "type", cols: 3, designWidth: 480 },
  { slug: "inputs", label: "Inputs", group: "type", cols: 3, designWidth: 560 },
  { slug: "selects", label: "Selects & Dropdowns", group: "type", cols: 3, designWidth: 600 },
  { slug: "checkboxes", label: "Checkboxes & Radios", group: "type", cols: 3, designWidth: 480 },
  { slug: "switches", label: "Switches & Toggles", group: "type", cols: 3, designWidth: 480 },
  { slug: "sliders", label: "Sliders", group: "type", cols: 3, designWidth: 520 },
  { slug: "calendar", label: "Calendar & Dates", group: "type", cols: 2, designWidth: 760 },
  { slug: "forms", label: "Forms", group: "type", cols: 2, designWidth: 760 },
  { slug: "file-upload", label: "File Upload", group: "type", cols: 2, designWidth: 640 },
  { slug: "cards", label: "Cards", group: "type", cols: 2, designWidth: 760 },
  { slug: "text", label: "Text", group: "type", cols: 3, designWidth: 640 },
  { slug: "backgrounds", label: "Backgrounds", group: "type", cols: 2, designWidth: 1280 },
  { slug: "gradients", label: "Gradients", group: "type", cols: 4, designWidth: 520 },
  { slug: "borders", label: "Borders", group: "type", cols: 3, designWidth: 560 },
  { slug: "effects", label: "Visual Effects", group: "type", cols: 2, designWidth: 820 },
  { slug: "cursors", label: "Cursor Effects", group: "type", cols: 2, designWidth: 820 },
  { slug: "scroll", label: "Scroll Effects", group: "type", cols: 2, designWidth: 1000 },
  { slug: "navigation", label: "Navigation", group: "type", cols: 2, designWidth: 1000 },
  { slug: "tabs", label: "Tabs", group: "type", cols: 3, designWidth: 640 },
  { slug: "menus", label: "Docks & Menus", group: "type", cols: 2, designWidth: 760 },
  { slug: "modals", label: "Modals & Overlays", group: "type", cols: 3, designWidth: 640 },
  { slug: "tooltips", label: "Tooltips", group: "type", cols: 3, designWidth: 480 },
  { slug: "notifications", label: "Notifications", group: "type", cols: 3, designWidth: 560 },
  { slug: "accordions", label: "Accordions", group: "type", cols: 2, designWidth: 700 },
  { slug: "carousels", label: "Carousels", group: "type", cols: 2, designWidth: 900 },
  { slug: "tables", label: "Tables", group: "type", cols: 1, designWidth: 1100 },
  { slug: "charts", label: "Charts & Stats", group: "type", cols: 2, designWidth: 760 },
  { slug: "data-display", label: "Data Display", group: "type", cols: 2, designWidth: 760 },
  { slug: "avatars", label: "Avatars", group: "type", cols: 4, designWidth: 440 },
  { slug: "badges", label: "Badges", group: "type", cols: 4, designWidth: 420 },
  { slug: "loaders", label: "Loaders & Progress", group: "type", cols: 4, designWidth: 460 },
  { slug: "steppers", label: "Steppers", group: "type", cols: 2, designWidth: 760 },
  { slug: "media", label: "Images & Video", group: "type", cols: 2, designWidth: 900 },
  { slug: "3d", label: "3D", group: "type", cols: 2, designWidth: 1000 },
  { slug: "devices", label: "Device Mockups", group: "type", cols: 2, designWidth: 1000 },
  { slug: "code", label: "Code & Terminal", group: "type", cols: 2, designWidth: 900 },
  { slug: "misc", label: "Misc", group: "type", cols: 3, designWidth: 700 },
  // ── Use cases: the page you're building ─────────────────────────────────
  { slug: "auth", label: "Sign in / Sign up", group: "use", cols: 2, designWidth: 640 },
  { slug: "payments", label: "Payments & Checkout", group: "use", cols: 2, designWidth: 700 },
  { slug: "pricing", label: "Pricing", group: "use", cols: 2, designWidth: 1100 },
  { slug: "heroes", label: "Heroes", group: "use", cols: 1, designWidth: 1280 },
  { slug: "features", label: "Features & Bento", group: "use", cols: 2, designWidth: 1000 },
  { slug: "testimonials", label: "Testimonials", group: "use", cols: 2, designWidth: 900 },
  { slug: "ctas", label: "Call to Action", group: "use", cols: 1, designWidth: 1100 },
  { slug: "footers", label: "Footers", group: "use", cols: 1, designWidth: 1280 },
  { slug: "dashboards", label: "Dashboard", group: "use", cols: 2, designWidth: 1100 },
  { slug: "chat", label: "Chat & AI", group: "use", cols: 2, designWidth: 760 },
  { slug: "social", label: "Social", group: "use", cols: 3, designWidth: 560 },
  { slug: "onboarding", label: "Onboarding", group: "use", cols: 2, designWidth: 760 },
  { slug: "settings", label: "Settings & Profile", group: "use", cols: 2, designWidth: 700 },
  { slug: "search", label: "Search & Command", group: "use", cols: 2, designWidth: 700 },
  { slug: "feedback", label: "Feedback & Polls", group: "use", cols: 3, designWidth: 600 },
  { slug: "contact", label: "Contact & Newsletter", group: "use", cols: 2, designWidth: 760 },
  { slug: "ecommerce", label: "E-commerce", group: "use", cols: 2, designWidth: 900 },
  { slug: "portfolio", label: "Portfolio & Gallery", group: "use", cols: 2, designWidth: 1000 },
  { slug: "empty-states", label: "Empty & 404", group: "use", cols: 2, designWidth: 900 },
];

// Category-grid card layout. Flip this ONE value: neither has per-card borders:
//   "lines" → tight 21st.dev grid with shared thin grid lines, no gap (current)
//   "gap"   → spaced borderless tiles with a subtle fill, no grid lines
export const CARD_LAYOUT: "gap" | "lines" = "gap";

export const CATEGORY_SLUGS = CATEGORY_CONFIG.map((c) => c.slug);

export const CATEGORY_BY_SLUG: Record<string, CategoryConfig> = Object.fromEntries(
  CATEGORY_CONFIG.map((c) => [c.slug, c]),
);

// Cards never get smaller than ~300px (a recorded clip is unreadable below
// that) and full-page blocks never get a whole row to themselves on desktop
// (one 1100px tile per screen made heroes a slog to browse).
export const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1 lg:grid-cols-2",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
};

export function categoryConfig(slug: string): CategoryConfig {
  return (
    CATEGORY_BY_SLUG[slug] ?? {
      slug,
      label: slug.replace(/\b\w/g, (c) => c.toUpperCase()),
      group: "type",
      cols: 3,
      designWidth: 700,
    }
  );
}
