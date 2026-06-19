/**
 * Capture choreography for comp-358
 * A small outline button ("W/ icon") with a dark rich tooltip containing
 * a globe icon, title "Tooltip with title and icon", and description text.
 * Sequence: hover button → dwell 2s (rich icon tooltip visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const btn = page.getByRole("button", { name: /w\/ icon|with icon/i });
    await btn.waitFor({ state: "visible", timeout: 3000 });

    // Hover to show the icon + title + description tooltip
    await btn.hover();
    // Dwell so the rich dark tooltip is clearly visible
    await wait(2000);

    // Move away to dismiss
    await page.mouse.move(cx + 100, cy - 70, { steps: 12 });
    await wait(500);
  } catch (err) {
    try {
      const btn = page.locator("button").first();
      await btn.hover();
      await wait(2000);
      await page.mouse.move(cx + 100, cy - 70, { steps: 12 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
