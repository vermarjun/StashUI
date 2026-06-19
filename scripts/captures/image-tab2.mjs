/**
 * Choreography for: image-tab2
 * Component: registry/ui-layouts/image-tabs.tsx  (shared with image-tab1)
 * Demo:      registry/ui-layouts/image-tabs.demo.tsx (shared — NOT edited here)
 *
 * Same demo as image-tab1; same interaction sequence — click tabs 2→3→1
 * so the active panel and desktop image panel animate.
 */

export default async function choreography(page, { W, H }) {
  // ── 1. Wait for rendered tab list ───────────────────────────────────────
  try {
    await page.waitForSelector('[class*="rounded-lg"]', { timeout: 8000 });
  } catch (e) {
    console.warn("image-tab2: tab list not ready", e.message);
  }

  // ── 2. Dwell on initial state ────────────────────────────────────────────
  await page.waitForTimeout(900);

  // ── 3. Click "Motion & Animation" (second tab) ──────────────────────────
  try {
    await page.getByRole("heading", { name: /Motion/i }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.22), Math.round(H * 0.46));
    } catch (e2) {
      console.warn("image-tab2: could not click tab 2", e2.message);
    }
  }
  await page.waitForTimeout(800);

  // ── 4. Click "Typography" (third tab) ───────────────────────────────────
  try {
    await page.getByRole("heading", { name: /Typography/i }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.22), Math.round(H * 0.62));
    } catch (e2) {
      console.warn("image-tab2: could not click tab 3", e2.message);
    }
  }
  await page.waitForTimeout(800);

  // ── 5. Return to "Design Systems" (first tab) ───────────────────────────
  try {
    await page.getByRole("heading", { name: /Design Systems/i }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.22), Math.round(H * 0.30));
    } catch (e2) {
      console.warn("image-tab2: could not return to tab 1", e2.message);
    }
  }
  await page.waitForTimeout(700);
}
