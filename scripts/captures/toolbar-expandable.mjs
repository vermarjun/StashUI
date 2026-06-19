/**
 * Choreography: toolbar-expandable (cult-ui)
 *
 * Component: registry/cult-ui/toolbar-expandable.tsx
 * Demo:      registry/cult-ui/toolbar-expandable.demo.tsx
 *
 * Steps: Profile | Dashboard | Notifications | Settings
 * The toolbar collapses to a nav bar; clicking a step button expands it and
 * shows the step's content panel with a spring height animation.
 */
export default async function choreography(page, { W, H }) {
  // ── 1. Settle ─────────────────────────────────────────────────────────────
  try {
    await page.waitForSelector('[data-slot="scroll-area"]', { timeout: 6000 });
  } catch (e) {
    console.warn('toolbar-expandable: scroll-area not found', e.message);
  }
  try { await page.waitForTimeout(600); } catch (_) {}

  // ── 2. Click "Profile" step to expand toolbar ─────────────────────────────
  try {
    await page.getByText('Profile', { exact: true }).first().click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.35), Math.round(H * 0.60));
    } catch (e2) { console.warn('toolbar-expandable: Profile click failed', e2.message); }
  }
  try { await page.waitForTimeout(900); } catch (_) {}

  // ── 3. Dwell on expanded Profile content ─────────────────────────────────
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 4. Click "Dashboard" step (morphs content, height animates) ───────────
  try {
    await page.getByText('Dashboard', { exact: true }).first().click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.47), Math.round(H * 0.60));
    } catch (e2) { console.warn('toolbar-expandable: Dashboard click failed', e2.message); }
  }
  try { await page.waitForTimeout(900); } catch (_) {}

  // ── 5. Click "Notifications" step ────────────────────────────────────────
  try {
    await page.getByText('Notifications', { exact: true }).first().click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.60), Math.round(H * 0.60));
    } catch (e2) { console.warn('toolbar-expandable: Notifications click failed', e2.message); }
  }
  try { await page.waitForTimeout(900); } catch (_) {}

  // ── 6. Click "Profile" again to collapse (toggle off) ─────────────────────
  try {
    await page.getByText('Profile', { exact: true }).first().click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.35), Math.round(H * 0.60));
    } catch (e2) { console.warn('toolbar-expandable: Profile re-click failed', e2.message); }
  }
  try { await page.waitForTimeout(600); } catch (_) {}
}
