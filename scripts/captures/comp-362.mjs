/**
 * Capture choreography for comp-362
 * A small outline button ("Chart") with a rich chart-style tooltip showing
 * date "Tuesday, Aug 13" and three color-coded rows (Sales $40, Revenue $74, Costs $410).
 * Sequence: hover button → dwell 2s (chart tooltip fully visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const btn = page.getByRole("button", { name: /chart/i });
    await btn.waitFor({ state: "visible", timeout: 3000 });

    // Hover to reveal the chart tooltip
    await btn.hover();
    // Dwell so the multi-row chart data is clearly visible
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
