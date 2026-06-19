/**
 * Choreography: intro-disclosure
 * A multi-step feature-tour dialog. The demo starts open={true} but the
 * component self-closes on mount (it renders an "Open Feature Tour" trigger),
 * so click that to (re)open, then advance through the steps. Short timeouts on
 * every action so a missing selector fails fast instead of hanging ~30s.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(900); } catch (_) {}

  // 2. Open the tour (click the trigger if the dialog isn't already open)
  try {
    await page.getByRole("button", { name: /open feature tour/i }).click({ timeout: 2500 });
    await wait(900);
  } catch (_) {}

  // 3. Advance through the steps via Next/Continue.
  for (let i = 0; i < 2; i++) {
    try {
      await page.getByRole("button", { name: /next|continue/i }).last().click({ timeout: 2500 });
      await wait(900);
    } catch (_) {}
  }

  // 4. Dwell on the final step (with its action button).
  try { await wait(1200); } catch (_) {}

  // 5. Ease the cursor away.
  try { await page.mouse.move(W / 2, H * 0.05, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
