/**
 * Capture choreography for tooltip
 * A basic Tooltip with a "Hover me" button trigger. The tooltip content
 * appears above/below the trigger on hover.
 * Sequence: hover trigger → dwell 1.8s (tooltip visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const trigger = page.getByRole("button", { name: /hover me/i });
    await trigger.waitFor({ state: "visible", timeout: 3000 });

    // Hover to show the tooltip
    await trigger.hover();
    // Dwell while tooltip is visible
    await wait(1800);

    // Move away to dismiss
    await page.mouse.move(cx + 120, cy - 80, { steps: 12 });
    await wait(500);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(1800);
      await page.mouse.move(cx + 120, cy - 80, { steps: 12 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
