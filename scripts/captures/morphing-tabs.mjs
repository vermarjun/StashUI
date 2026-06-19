/**
 * Choreography: morphing-tabs (inspira-react)
 *
 * Component: registry/inspira-react/morphing-tabs.tsx
 * Demo:      registry/inspira-react/morphing-tabs.demo.tsx
 *
 * Four tabs: Home | About | Work | Contact
 * The active tab gains a left+right margin (20px) creating a goo-filter morph
 * between adjacent buttons when switching. The transition is CSS duration-500.
 *
 * Strategy: Click tabs in sequence to trigger the gooey morph animation,
 * then return to Home so the capture loops cleanly.
 */
export default async function choreography(page, { W, H }) {
  // Tab row is vertically centered in a min-h-32 container → approx H * 0.42
  const tabRowY = Math.round(H * 0.42);

  // ── 1. Wait for tabs ──────────────────────────────────────────────────────
  try {
    await page.waitForSelector('button', { timeout: 6000 });
  } catch (e) {
    console.warn('morphing-tabs: button not found', e.message);
  }
  try { await page.waitForTimeout(600); } catch (_) {}

  // ── 2. Click "About" (Home → About morph) ────────────────────────────────
  try {
    await page.getByRole('button', { name: 'About', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.46), tabRowY);
    } catch (e2) { console.warn('morphing-tabs: About click failed', e2.message); }
  }
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 3. Click "Work" (About → Work morph) ─────────────────────────────────
  try {
    await page.getByRole('button', { name: 'Work', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.53), tabRowY);
    } catch (e2) { console.warn('morphing-tabs: Work click failed', e2.message); }
  }
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 4. Click "Contact" (Work → Contact morph) ────────────────────────────
  try {
    await page.getByRole('button', { name: 'Contact', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.62), tabRowY);
    } catch (e2) { console.warn('morphing-tabs: Contact click failed', e2.message); }
  }
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 5. Return to "Home" ───────────────────────────────────────────────────
  try {
    await page.getByRole('button', { name: 'Home', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.38), tabRowY);
    } catch (e2) { console.warn('morphing-tabs: Home return click failed', e2.message); }
  }
  try { await page.waitForTimeout(600); } catch (_) {}
}
