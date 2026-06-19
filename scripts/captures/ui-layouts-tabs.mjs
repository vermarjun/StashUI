/**
 * Choreography for: ui-layouts-tabs
 * Component: registry/ui-layouts/tab.tsx
 * Demo:      registry/ui-layouts/tab.demo.tsx  (fixed by this component)
 *
 * Interaction: click through 3 wobbly tab buttons (Overview → Features →
 * Pricing) so the layoutId animated highlight slides between them and the
 * content panel fades + slides in/out with direction awareness.
 *
 * Layout reference (~1100×688):
 *   Tab bar is centred horizontally at ~y=H*0.44
 *   Three buttons: Overview (~x=W*0.38), Features (~x=W*0.50), Pricing (~x=W*0.62)
 */

export default async function choreography(page, { W, H }) {
  // ── 1. Wait for the tab bar to mount ────────────────────────────────────
  try {
    await page.waitForSelector('[class*="rounded-lg"]', { timeout: 8000 });
  } catch (e) {
    console.warn("ui-layouts-tabs: tab bar not found", e.message);
  }

  // ── 2. Dwell on initial state (Overview active) ──────────────────────────
  await page.waitForTimeout(800);

  // ── 3. Click "Features" tab ──────────────────────────────────────────────
  try {
    await page.getByText("Features", { exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.50), Math.round(H * 0.44));
    } catch (e2) {
      console.warn("ui-layouts-tabs: could not click Features tab", e2.message);
    }
  }
  await page.waitForTimeout(900);

  // ── 4. Click "Pricing" tab ───────────────────────────────────────────────
  try {
    await page.getByText("Pricing", { exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.62), Math.round(H * 0.44));
    } catch (e2) {
      console.warn("ui-layouts-tabs: could not click Pricing tab", e2.message);
    }
  }
  await page.waitForTimeout(900);

  // ── 5. Return to "Overview" tab ─────────────────────────────────────────
  try {
    await page.getByText("Overview", { exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.38), Math.round(H * 0.44));
    } catch (e2) {
      console.warn("ui-layouts-tabs: could not return to Overview tab", e2.message);
    }
  }
  await page.waitForTimeout(700);
}
