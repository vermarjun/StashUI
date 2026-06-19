/**
 * Choreography for: img-tabs-standalone
 * Component: registry/ui-layouts/img-tabs-standalone.tsx
 * Demo:      registry/ui-layouts/img-tabs-standalone.demo.tsx
 *
 * The component renders its own hardcoded tab data (3 tabs):
 *   0 — "How do UI components improve UX?"
 *   1 — "Important of UI component."
 *   2 — "Is UI and UX Same?"
 *
 * Layout (desktop, ~1100×688):
 *   Left col (5/12)  ~x 0–458px: accordion tab list
 *   Right col (7/12) ~x 458–1100px: animated image panel
 *
 * Interaction: click tab 2 → tab 3 → tab 1 to cycle the accordion + image.
 */

export default async function choreography(page, { W, H }) {
  // ── 1. Wait for the tab list to render ──────────────────────────────────
  try {
    await page.waitForSelector('[class*="rounded-lg"]', { timeout: 8000 });
  } catch (e) {
    console.warn("img-tabs-standalone: tab list not found", e.message);
  }

  // ── 2. Dwell on initial state (first tab open) ───────────────────────────
  await page.waitForTimeout(900);

  // ── 3. Click the second tab ──────────────────────────────────────────────
  try {
    await page
      .getByRole("heading", { name: /Important of UI component/i })
      .click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.21), Math.round(H * 0.50));
    } catch (e2) {
      console.warn("img-tabs-standalone: could not click tab 2", e2.message);
    }
  }
  await page.waitForTimeout(850);

  // ── 4. Click the third tab ───────────────────────────────────────────────
  try {
    await page
      .getByRole("heading", { name: /Is UI and UX Same/i })
      .click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.21), Math.round(H * 0.66));
    } catch (e2) {
      console.warn("img-tabs-standalone: could not click tab 3", e2.message);
    }
  }
  await page.waitForTimeout(850);

  // ── 5. Return to first tab ───────────────────────────────────────────────
  try {
    await page
      .getByRole("heading", { name: /How do UI components improve UX/i })
      .click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.21), Math.round(H * 0.33));
    } catch (e2) {
      console.warn("img-tabs-standalone: could not return to tab 1", e2.message);
    }
  }
  await page.waitForTimeout(700);
}
