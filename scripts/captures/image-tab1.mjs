/**
 * Choreography for: image-tab1
 * Component: registry/ui-layouts/image-tabs.tsx
 * Demo:      registry/ui-layouts/image-tabs.demo.tsx
 *
 * Interaction: click through 3 accordion-style image tabs so the active
 * panel + desktop image panel changes on each click.
 *
 * Layout reference (desktop, ~1100×688):
 *   Left  col (5/12): tab list — each TabItem is an accordion card
 *   Right col (7/12): TabImageContainer — fades in the active image
 *
 * The demo renders inside a centred wrapper; the tab list starts at
 * roughly x=110, y=180 at the demo scale.
 */

export default async function choreography(page, { W, H }) {
  // ── 1. Wait for the tab list to be present ──────────────────────────────
  try {
    await page.waitForSelector('[class*="rounded-lg"]', { timeout: 8000 });
  } catch (e) {
    console.warn("image-tab1: tab list not found within timeout", e.message);
  }

  // ── 2. Dwell on initial state (tab 1 "Design Systems" active) ───────────
  await page.waitForTimeout(900);

  // ── 3. Click tab 2 — "Motion & Animation" ───────────────────────────────
  try {
    const tab2 = page.getByRole("heading", { name: /Motion/i });
    await tab2.click();
  } catch (e) {
    // Fallback: click by approximate coordinates (left column, second card)
    try {
      await page.mouse.click(Math.round(W * 0.22), Math.round(H * 0.46));
    } catch (e2) {
      console.warn("image-tab1: could not click tab 2", e2.message);
    }
  }
  await page.waitForTimeout(800);

  // ── 4. Click tab 3 — "Typography" ───────────────────────────────────────
  try {
    const tab3 = page.getByRole("heading", { name: /Typography/i });
    await tab3.click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.22), Math.round(H * 0.62));
    } catch (e2) {
      console.warn("image-tab1: could not click tab 3", e2.message);
    }
  }
  await page.waitForTimeout(800);

  // ── 5. Return to tab 1 — "Design Systems" ───────────────────────────────
  try {
    const tab1 = page.getByRole("heading", { name: /Design Systems/i });
    await tab1.click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.22), Math.round(H * 0.30));
    } catch (e2) {
      console.warn("image-tab1: could not return to tab 1", e2.message);
    }
  }
  await page.waitForTimeout(700);
}
