// The component taxonomy + per-type display tuning.
//
// `cols`        — cards per row at desktop.
// `designWidth` — the viewport width (px) the component renders at inside its
//                 iframe before being scaled to fit the card. Small UI (buttons)
//                 use a small width so they're not shrunk to nothing; big blocks
//                 (heroes, backgrounds) use a desktop width and scale down to
//                 fit. The preview box is always 16:10 and the frame is scaled
//                 uniformly, so nothing ever overflows.

export interface CategoryConfig {
  slug: string;
  label: string;
  cols: 1 | 2 | 3 | 4;
  designWidth: number;
}

export const CATEGORY_CONFIG: CategoryConfig[] = [
  { slug: "buttons", label: "Buttons", cols: 3, designWidth: 480 },
  { slug: "inputs", label: "Inputs", cols: 3, designWidth: 560 },
  { slug: "selects", label: "Selects & Dropdowns", cols: 3, designWidth: 600 },
  { slug: "checkboxes", label: "Checkboxes & Switches", cols: 3, designWidth: 480 },
  { slug: "sliders", label: "Sliders", cols: 3, designWidth: 520 },
  { slug: "calendar", label: "Calendar & Dates", cols: 2, designWidth: 760 },
  { slug: "forms", label: "Forms", cols: 2, designWidth: 760 },
  { slug: "file-upload", label: "File Upload", cols: 2, designWidth: 640 },
  { slug: "cards", label: "Cards", cols: 2, designWidth: 760 },
  { slug: "pricing", label: "Pricing", cols: 2, designWidth: 1100 },
  { slug: "testimonials", label: "Testimonials", cols: 2, designWidth: 900 },
  { slug: "text", label: "Text", cols: 3, designWidth: 640 },
  { slug: "backgrounds", label: "Backgrounds", cols: 2, designWidth: 1280 },
  { slug: "borders", label: "Borders", cols: 3, designWidth: 560 },
  { slug: "heroes", label: "Heroes", cols: 1, designWidth: 1280 },
  { slug: "ctas", label: "Call to Action", cols: 1, designWidth: 1100 },
  { slug: "footers", label: "Footers", cols: 1, designWidth: 1280 },
  { slug: "navigation", label: "Navigation", cols: 2, designWidth: 1000 },
  { slug: "modals", label: "Modals & Overlays", cols: 3, designWidth: 640 },
  { slug: "tooltips", label: "Tooltips", cols: 3, designWidth: 480 },
  { slug: "tables", label: "Tables", cols: 1, designWidth: 1100 },
  { slug: "charts", label: "Charts", cols: 2, designWidth: 760 },
  { slug: "avatars", label: "Avatars", cols: 4, designWidth: 440 },
  { slug: "badges", label: "Badges", cols: 4, designWidth: 420 },
  { slug: "loaders", label: "Loaders", cols: 4, designWidth: 460 },
  { slug: "carousels", label: "Carousels", cols: 2, designWidth: 900 },
  { slug: "accordions", label: "Accordions", cols: 2, designWidth: 700 },
  { slug: "notifications", label: "Notifications", cols: 3, designWidth: 560 },
  { slug: "effects", label: "Effects", cols: 2, designWidth: 820 },
  { slug: "gradients", label: "Gradients", cols: 4, designWidth: 520 },
  { slug: "media", label: "Media", cols: 2, designWidth: 900 },
  { slug: "data-display", label: "Data Display", cols: 2, designWidth: 760 },
  { slug: "misc", label: "Misc", cols: 3, designWidth: 700 },
];

// Category-grid card layout. Flip this ONE value — neither has per-card borders:
//   "lines" → tight 21st.dev grid with shared thin grid lines, no gap (current)
//   "gap"   → spaced borderless tiles with a subtle fill, no grid lines
export const CARD_LAYOUT: "gap" | "lines" = "lines";

export const CATEGORY_SLUGS = CATEGORY_CONFIG.map((c) => c.slug);

export const CATEGORY_BY_SLUG: Record<string, CategoryConfig> = Object.fromEntries(
  CATEGORY_CONFIG.map((c) => [c.slug, c]),
);

export const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 lg:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

export function categoryConfig(slug: string): CategoryConfig {
  return (
    CATEGORY_BY_SLUG[slug] ?? {
      slug,
      label: slug.replace(/\b\w/g, (c) => c.toUpperCase()),
      cols: 3,
      designWidth: 700,
    }
  );
}
