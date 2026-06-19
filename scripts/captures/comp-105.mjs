/**
 * Capture choreography for comp-105
 * Copy-to-clipboard icon button — CopyIcon animates to green CheckIcon on click, resets after 1.5s.
 * Sequence: hover (tooltip) → click (copy icon → check icon) → hold to show check → wait for reset → rest (~3.2s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const btn = page.getByRole('button', { name: /copy to clipboard/i });
    await btn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover to show tooltip
    await btn.hover();
    await page.waitForTimeout(600);

    // Click to trigger copy animation (CopyIcon → CheckIcon)
    await btn.click();
    await page.waitForTimeout(900);

    // Hold so the green check is visible in the video
    await page.mouse.move(cx + 60, cy);
    await page.waitForTimeout(600);

    // Wait for button to reset (1.5s timeout in component)
    await page.waitForTimeout(600);

    // Rest
    await page.mouse.move(cx + 80, cy - 60);
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await page.waitForTimeout(500);
      await page.mouse.move(cx + 80, cy - 60);
      await page.waitForTimeout(300);
    } catch (_) {}
  }
}
