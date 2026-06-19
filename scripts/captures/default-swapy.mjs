/**
 * Capture choreography for default-swapy.
 *
 * The layout is a 12-col swapy bento grid (swapMode:"hover").
 * Strategy: grab a card by its centre, drag it ~10 steps onto the
 * neighbouring slot so the hover-swap fires, settle, then do a second
 * shorter drag to show the swap reversing naturally.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let swapy initialise
  try {
    await wait(700);
  } catch (_) {}

  // ── First drag: slot 1 (top-left area) → slot 2 (next column) ──────────────
  // Grid lives roughly from y=H*0.05 to y=H*0.95; first row of cards ~y=H*0.2
  const card1X = Math.round(W * 0.15);
  const card1Y = Math.round(H * 0.25);
  const card2X = Math.round(W * 0.38);
  const card2Y = Math.round(H * 0.25);

  try {
    await page.mouse.move(card1X, card1Y, { steps: 5 });
    await wait(120);
    await page.mouse.down();
    await wait(150);
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(
        card1X + (card2X - card1X) * t,
        card1Y + (card2Y - card1Y) * t
      );
      await wait(40);
    }
    await wait(500); // dwell so the swap animation completes
    await page.mouse.up();
    await wait(700);
  } catch (_) {}

  // ── Second drag: slot 4 (second row left) → slot 5 (second row mid) ────────
  const card4X = Math.round(W * 0.22);
  const card4Y = Math.round(H * 0.58);
  const card5X = Math.round(W * 0.52);
  const card5Y = Math.round(H * 0.58);

  try {
    await page.mouse.move(card4X, card4Y, { steps: 5 });
    await wait(120);
    await page.mouse.down();
    await wait(150);
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(
        card4X + (card5X - card4X) * t,
        card4Y + (card5Y - card4Y) * t
      );
      await wait(40);
    }
    await wait(500);
    await page.mouse.up();
    await wait(600);
  } catch (_) {}

  // Move mouse away so no hover state lingers
  try {
    await page.mouse.move(W / 2, H * 0.02, { steps: 8 });
    await wait(400);
  } catch (_) {}
}
