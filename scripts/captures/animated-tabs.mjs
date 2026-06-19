/**
 * Choreography for: animated-tabs
 * Component: registry/ui-layouts/tab.tsx  (shared with ui-layouts-tabs)
 * Demo:      registry/ui-layouts/tab.demo.tsx  (shared — NOT edited here)
 *
 * Same demo and component as ui-layouts-tabs.
 * Interaction: click tabs in sequence — Overview → Features → Pricing — so
 * the wobbly layoutId highlight and directional content transitions are visible.
 */

export default async function choreography(page, { W, H }) {
  // ── 1. Wait for tab bar ─────────────────────────────────────────────────
  try {
    await page.waitForSelector('[class*="rounded-lg"]', { timeout: 8000 });
  } catch (e) {
    console.warn("animated-tabs: tab bar not found", e.message);
  }

  // ── 2. Dwell on initial state ────────────────────────────────────────────
  await page.waitForTimeout(800);

  // ── 3. Click "Features" ──────────────────────────────────────────────────
  try {
    await page.getByText("Features", { exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.50), Math.round(H * 0.44));
    } catch (e2) {
      console.warn("animated-tabs: could not click Features", e2.message);
    }
  }
  await page.waitForTimeout(900);

  // ── 4. Click "Pricing" ───────────────────────────────────────────────────
  try {
    await page.getByText("Pricing", { exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.62), Math.round(H * 0.44));
    } catch (e2) {
      console.warn("animated-tabs: could not click Pricing", e2.message);
    }
  }
  await page.waitForTimeout(900);

  // ── 5. Return to "Overview" ──────────────────────────────────────────────
  try {
    await page.getByText("Overview", { exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.38), Math.round(H * 0.44));
    } catch (e2) {
      console.warn("animated-tabs: could not return to Overview", e2.message);
    }
  }
  await page.waitForTimeout(700);
}
