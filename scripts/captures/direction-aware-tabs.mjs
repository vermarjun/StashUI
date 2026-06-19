/**
 * Choreography: direction-aware-tabs (cult-ui)
 *
 * Component: registry/cult-ui/direction-aware-tabs.tsx
 * Demo:      registry/cult-ui/direction-aware-tabs.demo.tsx
 *
 * Three tabs: Design | Develop | Deploy
 * The active-tab bubble uses layoutId="bubble"; content slides in/out with a
 * directional x-offset + blur. Click forward then backward to show both
 * directions, then return to start.
 */
export default async function choreography(page, { W, H }) {
  // ── 1. Settle on initial "Design" tab ─────────────────────────────────────
  try {
    await page.waitForSelector('button', { timeout: 6000 });
  } catch (e) {
    console.warn('direction-aware-tabs: button selector timeout', e.message);
  }
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 2. Click "Develop" (forward → content slides in from right) ───────────
  try {
    await page.getByRole('button', { name: 'Develop', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.53), Math.round(H * 0.22));
    } catch (e2) { console.warn('direction-aware-tabs: Develop click failed', e2.message); }
  }
  try { await page.waitForTimeout(900); } catch (_) {}

  // ── 3. Click "Deploy" (forward → content slides in from right) ────────────
  try {
    await page.getByRole('button', { name: 'Deploy', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.67), Math.round(H * 0.22));
    } catch (e2) { console.warn('direction-aware-tabs: Deploy click failed', e2.message); }
  }
  try { await page.waitForTimeout(900); } catch (_) {}

  // ── 4. Click "Design" (backward → content slides in from left) ───────────
  try {
    await page.getByRole('button', { name: 'Design', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.37), Math.round(H * 0.22));
    } catch (e2) { console.warn('direction-aware-tabs: Design click failed', e2.message); }
  }
  try { await page.waitForTimeout(700); } catch (_) {}
}
