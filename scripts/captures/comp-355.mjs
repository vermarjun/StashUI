/**
 * Capture choreography for comp-355
 * A small outline button ("Dark") with a dark-themed tooltip
 * "This tooltip will be always dark".
 * Sequence: hover button → dwell 1.8s (dark tooltip visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const btn = page.getByRole("button", { name: /dark/i });
    await btn.waitFor({ state: "visible", timeout: 3000 });

    // Hover to show the dark tooltip
    await btn.hover();
    // Dwell so dark tooltip is clearly visible
    await wait(1800);

    // Move away to dismiss
    await page.mouse.move(cx + 100, cy - 70, { steps: 12 });
    await wait(500);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(1800);
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
