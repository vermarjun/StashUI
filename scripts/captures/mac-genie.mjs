/**
 * Choreography for: mac-genie
 * Component: registry/ui-layouts/genie-effect.tsx
 * Demo:      registry/ui-layouts/genie-effect.demo.tsx
 *
 * GenieEffect renders a full macOS desktop simulation:
 *   - A background macOS wallpaper fills the container (w-full h-150)
 *   - A centred Mac window (WIN_W=420 × WIN_H=330) for the active app
 *   - A dock at the bottom with 6 magnified icons:
 *       Safari, Arc, Trello, Dribbble, Command Code, UI Layouts
 *
 * Interaction:
 *   1. Wait for mount (SSR guard; mounted state must flip)
 *   2. Dwell — show the open window
 *   3. Click a dock icon whose window is currently OPEN → triggers doMinimize
 *      (genie scanline canvas animates the window squishing into the dock)
 *   4. Dwell on minimised state (canvas plays the squish, ~500 ms DUR)
 *   5. Click the same dock icon again → triggers doOpen
 *      (genie canvas plays the expand back out)
 *   6. Dwell until the window is fully restored
 *
 * The component opens "Safari" by default (first app in APPS array, id="safari").
 * The dock lives at the bottom of the container; icons are roughly at y≈H-50px.
 * Icon positions (6 icons, each base 50px, spaced): centred around x=W/2.
 * Safari is icon[0]; its centre ≈ x = W/2 - (2.5 * ~58px) = W/2 - 145.
 *
 * Canvas animation DUR = 500 ms; we dwell 700 ms to comfortably clear it.
 */

export default async function choreography(page, { W, H }) {
  // ── 1. Wait for the component to mount (mounted flag + canvas) ───────────
  try {
    await page.waitForSelector("canvas", { timeout: 10000 });
  } catch (e) {
    console.warn("mac-genie: canvas not found within timeout", e.message);
  }

  // Extra settle time — html-to-image snapshot pipeline runs on first open
  await page.waitForTimeout(1200);

  // ── 2. Dwell on the open window state ───────────────────────────────────
  await page.waitForTimeout(800);

  // ── 3. Click the active (Safari) dock icon to trigger genie MINIMIZE ─────
  // Safari is the first of 6 icons centred in the dock.
  // Each icon slot ≈ 58 px wide; 6 icons total → total dock width ≈ 348 px
  // Centre of dock: x = W/2; Safari icon[0] centre ≈ W/2 - 2.5 * 58 = W/2 - 145
  const ICON_SLOT = 58;
  const dockY = Math.round(H - 40);
  const safariX = Math.round(W / 2 - 2.5 * ICON_SLOT);

  try {
    // Prefer role-based targeting via the tooltip label
    const safariBtn = page.getByRole("button", { name: /Safari/i });
    await safariBtn.click();
  } catch (e) {
    try {
      await page.mouse.click(safariX, dockY);
    } catch (e2) {
      console.warn("mac-genie: could not click Safari dock icon", e2.message);
    }
  }

  // ── 4. Dwell while genie minimize animation plays (DUR=500 ms) ───────────
  await page.waitForTimeout(900);

  // ── 5. Click the same dock icon again to trigger genie OPEN ─────────────
  try {
    const safariBtn = page.getByRole("button", { name: /Safari/i });
    await safariBtn.click();
  } catch (e) {
    try {
      await page.mouse.click(safariX, dockY);
    } catch (e2) {
      console.warn("mac-genie: could not click Safari dock icon (reopen)", e2.message);
    }
  }

  // ── 6. Dwell while genie expand animation plays, then settle ─────────────
  await page.waitForTimeout(900);

  // ── 7. End near start — mouse back to dock centre ────────────────────────
  try {
    await page.mouse.move(Math.round(W / 2), dockY);
  } catch (e) {
    console.warn("mac-genie: final mouse move failed", e.message);
  }
  await page.waitForTimeout(400);
}
