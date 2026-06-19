/**
 * Choreography: scroll-island (inspira-react)
 *
 * Component: registry/inspira-react/scroll-island.tsx
 * Demo:      registry/inspira-react/scroll-island.demo.tsx
 *
 * The ScrollIsland is a fixed dynamic-island at top-center (fixed, z-[999]).
 * It tracks window.scrollY to update a circular progress bar and percentage.
 * Clicking toggles open/closed, revealing a scrollable children list.
 *
 * Demo renders a 300vh page — enough for scroll progress to visibly advance.
 *
 * Strategy:
 *  1. Dwell at top (0 % progress).
 *  2. Click the island to expand it → children list slides in.
 *  3. Scroll down ~40% of the page → progress bar + % update.
 *  4. Dwell expanded + scrolled.
 *  5. Click again to collapse.
 *  6. Scroll back to top.
 */
export default async function choreography(page, { W, H }) {
  // Island is fixed at left:50% top:12 (top-12 = 48px), -translate-x-1/2
  const islandX = Math.round(W / 2);
  const islandY = 60; // fixed position

  // ── 1. Settle at top of page ──────────────────────────────────────────────
  try { await page.waitForTimeout(600); } catch (_) {}

  // ── 2. Click island to expand (show children) ─────────────────────────────
  try {
    await page.mouse.click(islandX, islandY);
  } catch (e) {
    console.warn('scroll-island: expand click failed', e.message);
  }
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 3. Scroll down to ~40% of 300vh = ~1.2 * viewport ───────────────────
  try {
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' });
    });
    await page.waitForTimeout(1200);
  } catch (e) {
    console.warn('scroll-island: scroll down failed', e.message);
  }

  // ── 4. Dwell — progress bar should show ~40% ─────────────────────────────
  try { await page.waitForTimeout(800); } catch (_) {}

  // ── 5. Scroll down further to ~70% ───────────────────────────────────────
  try {
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 2.1, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
  } catch (e) {
    console.warn('scroll-island: scroll further failed', e.message);
  }
  try { await page.waitForTimeout(600); } catch (_) {}

  // ── 6. Click to collapse island ──────────────────────────────────────────
  try {
    await page.mouse.click(islandX, islandY);
  } catch (e) {
    console.warn('scroll-island: collapse click failed', e.message);
  }
  try { await page.waitForTimeout(600); } catch (_) {}

  // ── 7. Scroll back to top ────────────────────────────────────────────────
  try {
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(700);
  } catch (e) {
    console.warn('scroll-island: scroll top failed', e.message);
  }
}
