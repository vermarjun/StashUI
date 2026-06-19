/**
 * Capture choreography for comp-356
 * A small outline button ("W/ arrow") with a dark tooltip that has an arrow pointer.
 * Sequence: hover button → dwell 1.8s (tooltip + arrow visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const btn = page.getByRole("button", { name: /w\/ arrow|with arrow/i });
    await btn.waitFor({ state: "visible", timeout: 3000 });

    // Hover to reveal the arrowed tooltip
    await btn.hover();
    // Dwell so the arrow and tooltip are clearly visible
    await wait(1800);

    // Move away to dismiss
    await page.mouse.move(cx + 100, cy - 70, { steps: 12 });
    await wait(500);
  } catch (err) {
    try {
      // Fallback: find first button with text content
      const btn = page.locator("button").first();
      await btn.hover();
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
