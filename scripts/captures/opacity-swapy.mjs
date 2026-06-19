/**
 * Capture choreography for opacity-swapy.
 *
 * The demo (swapy-opacity.demo.tsx → swapy-opacity.tsx) renders a vertical
 * list of 6 icon cards in a SwapyLayout with swapMode:"hover".  Dragging one
 * card over another triggers the swap while the dragged card renders at 50%
 * opacity (dragItemOpacity=50).
 * Strategy: drag card 1 (top) down onto card 3, let the swap animate, then
 * drag card 5 up onto card 2 for a second visible swap.
 */
export default async function capture(page, { W, H, wait }) {
  // Let Swapy initialise.
  try {
    await wait(700);
  } catch (_) {}

  // The card list is centred (w-96 mx-auto), roughly W*0.5 ± 192px.
  // Cards are stacked vertically with space-y-2 inside a centred column.
  // Approximate card centres (6 cards, each ~h-[60px] with padding):
  const cx = Math.round(W * 0.5);
  const cardH = Math.round(H * 0.1); // approx per-card height in rendered frame
  const topOffset = Math.round(H * 0.17); // y of first card centre

  const cardY = (i) => topOffset + i * cardH; // i = 0-based index

  // ── Drag 1: card[0] → card[2] ───────────────────────────────────────────────
  const src1X = cx;
  const src1Y = cardY(0);
  const dst1X = cx;
  const dst1Y = cardY(2);

  try {
    await page.mouse.move(src1X, src1Y, { steps: 6 });
    await wait(120);
    await page.mouse.down();
    await wait(150);
    const steps = 14;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(
        src1X + (dst1X - src1X) * t,
        src1Y + (dst1Y - src1Y) * t
      );
      await wait(35);
    }
    await wait(500); // dwell so hover-swap fires and animates.
    await page.mouse.up();
    await wait(700);
  } catch (_) {}

  // ── Drag 2: card[4] → card[1] ───────────────────────────────────────────────
  const src2X = cx;
  const src2Y = cardY(4);
  const dst2X = cx;
  const dst2Y = cardY(1);

  try {
    await page.mouse.move(src2X, src2Y, { steps: 6 });
    await wait(120);
    await page.mouse.down();
    await wait(150);
    const steps = 14;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(
        src2X + (dst2X - src2X) * t,
        src2Y + (dst2Y - src2Y) * t
      );
      await wait(35);
    }
    await wait(500);
    await page.mouse.up();
    await wait(600);
  } catch (_) {}

  // Move mouse away so no hover state lingers.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 8 });
    await wait(400);
  } catch (_) {}
}
