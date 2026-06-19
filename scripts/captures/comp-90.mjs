// comp-90: Disabled button with permanently spinning LoaderCircle icon.
// The button is always in a loading/disabled state — no interaction possible.
// Choreography: let spinner play → hover (cursor shows disabled) → move away → hover again → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    // Button is disabled, locate by role — it may still be in DOM
    const btn = page.getByRole('button').first();
    await btn.waitFor({ state: 'visible' });

    // Dwell to show spinning animation
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(700);

    // Hover over the disabled button (shows cursor:not-allowed style)
    await btn.hover({ force: true });
    await page.waitForTimeout(1000);

    // Move away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 14 });
    await page.waitForTimeout(500);

    // Hover again to close the loop near spinner state
    await btn.hover({ force: true });
    await page.waitForTimeout(700);

    // End resting
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-90 capture error:', err);
  }
}
