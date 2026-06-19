/**
 * Capture choreography for comp-99
 * An icon-only outline button (PlusIcon) with tooltip "Tooltip".
 * The tooltip appears when hovering the button.
 * Sequence: hover icon button → dwell 1.8s (tooltip visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const btn = page.getByRole("button", { name: /add new item/i });
    await btn.waitFor({ state: "visible", timeout: 3000 });

    // Hover to show the tooltip
    await btn.hover();
    // Dwell so the tooltip is clearly visible
    await wait(1800);

    // Move away to dismiss
    await page.mouse.move(cx + 100, cy - 70, { steps: 12 });
    await wait(500);
  } catch (err) {
    try {
      // Fallback: locate by aria-label
      const btn = page.locator("[aria-label='Add new item']");
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
