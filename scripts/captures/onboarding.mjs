/**
 * Choreography: onboarding (cult-ui)
 *
 * Component: registry/cult-ui/onboarding.tsx
 * Demo:      registry/cult-ui/onboarding.demo.tsx
 *
 * 3-step onboarding flow. StepIndicator shows progress dots.
 * Click "Next" to advance through all three steps, then dwell on the final
 * "Start Creating" CTA before clicking "Back" to return near the start.
 */
export default async function choreography(page, { W, H }) {
  // ── 1. Settle on step 1 ───────────────────────────────────────────────────
  try {
    await page.waitForSelector('[data-slot="onboarding"]', { timeout: 6000 });
  } catch (e) {
    console.warn('onboarding: root not found', e.message);
  }
  try { await page.waitForTimeout(700); } catch (_) {}

  // ── 2. Click "Next" → advance to step 2 ──────────────────────────────────
  try {
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.62), Math.round(H * 0.82));
    } catch (e2) { console.warn('onboarding: Next (step 1→2) failed', e2.message); }
  }
  try { await page.waitForTimeout(800); } catch (_) {}

  // ── 3. Dwell on step 2 ───────────────────────────────────────────────────
  try { await page.waitForTimeout(500); } catch (_) {}

  // ── 4. Click "Next" → advance to step 3 ──────────────────────────────────
  try {
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.62), Math.round(H * 0.82));
    } catch (e2) { console.warn('onboarding: Next (step 2→3) failed', e2.message); }
  }
  try { await page.waitForTimeout(800); } catch (_) {}

  // ── 5. Dwell on final step ("Start Creating" CTA is shown) ───────────────
  try { await page.waitForTimeout(800); } catch (_) {}

  // ── 6. Click "Back" → return to step 2 ───────────────────────────────────
  try {
    await page.getByRole('button', { name: 'Back', exact: true }).click();
  } catch (e) {
    try {
      await page.mouse.click(Math.round(W * 0.38), Math.round(H * 0.82));
    } catch (e2) { console.warn('onboarding: Back failed', e2.message); }
  }
  try { await page.waitForTimeout(600); } catch (_) {}
}
