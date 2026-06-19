/**
 * Choreography: inspira-animated-tabs
 *
 * Component: registry/inspira-react/animated-tabs.tsx
 * Demo:      registry/inspira-react/animated-tabs.demo.tsx
 *
 * Three tabs: Home | About | Work
 * The active pill uses layoutId for a spring transition. On hover the inactive
 * panels fan out in a stacked 3D perspective. Content panels are stacked with
 * scale+opacity; switching triggers a y-bounce on the incoming panel.
 *
 * Strategy:
 *  1. Dwell on Home (default) with mouse over tab bar to trigger fan-out.
 *  2. Click "About" — pill slides, panels re-stack with bounce.
 *  3. Click "Work" — same effect.
 *  4. Return to "Home" so capture ends near start.
 */
export default async function choreography(page, { W, H }) {
  // Rough tab bar position: centered, near top of the content area
  const tabBarY = Math.round(H * 0.20);
  const tabCenterX = Math.round(W * 0.50);

  // ── 1. Wait for tabs ──────────────────────────────────────────────────────
  try {
    await page.waitForSelector('button', { timeout: 6000 });
  } catch (e) {
    console.warn('inspira-animated-tabs: button not found', e.message);
  }
  try { await page.waitForTimeout(600); } catch (_) {}

  // ── 2. Hover over tab bar to trigger the stacked fan-out effect ───────────
  try {
    await page.mouse.move(tabCenterX, tabBarY, { steps: 10 });
    await page.waitForTimeout(700);
  } catch (_) {}

  // ── 3. Click "About" ─────────────────────────────────────────────────────
  try {
    await page.getByRole('button', { name: 'About', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.52), tabBarY);
    } catch (e2) { console.warn('inspira-animated-tabs: About click failed', e2.message); }
  }
  try { await page.waitForTimeout(900); } catch (_) {}

  // ── 4. Hover to show fan-out on new active state ──────────────────────────
  try {
    await page.mouse.move(tabCenterX, tabBarY, { steps: 8 });
    await page.waitForTimeout(600);
  } catch (_) {}

  // ── 5. Click "Work" ──────────────────────────────────────────────────────
  try {
    await page.getByRole('button', { name: 'Work', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.58), tabBarY);
    } catch (e2) { console.warn('inspira-animated-tabs: Work click failed', e2.message); }
  }
  try { await page.waitForTimeout(900); } catch (_) {}

  // ── 6. Return to "Home" ───────────────────────────────────────────────────
  try {
    await page.getByRole('button', { name: 'Home', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.45), tabBarY);
    } catch (e2) { console.warn('inspira-animated-tabs: Home click failed', e2.message); }
  }
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 7. Move mouse away so panels collapse back to stacked rest state ──────
  try {
    await page.mouse.move(tabCenterX, Math.round(H * 0.85), { steps: 12 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
