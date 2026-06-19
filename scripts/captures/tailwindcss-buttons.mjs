export default async function capture(page, { W, H, cfg, wait }) {
  // The demo is a 3×2 grid of ButtonsCard cells, each holding a styled button.
  // Choreography: dwell briefly, then hover each card in turn so the clipboard
  // icon appears and the border brightens, showing off the hover effect.

  const cards = page.locator(".group\\/btn");

  // 1. Initial dwell so the grid is fully visible before movement.
  try {
    await wait(800);
  } catch (_) {}

  // 2. Hover each card with a short dwell — show the hover state (icon + border).
  const count = await cards.count().catch(() => 0);
  for (let i = 0; i < count; i++) {
    try {
      await cards.nth(i).hover({ force: true });
      await wait(600);
    } catch (_) {}
  }

  // 3. Move away to neutral position so all cards return to rest state.
  try {
    await page.mouse.move(W * 0.5, H * 0.05, { steps: 20 });
    await wait(500);
  } catch (_) {}

  // 4. Second pass — hover top row cards individually with slower entry.
  for (let i = 0; i < Math.min(count, 3); i++) {
    try {
      await cards.nth(i).hover({ force: true });
      await wait(500);
    } catch (_) {}
  }

  // 5. End at neutral so loop seam is clean.
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 15 });
    await wait(400);
  } catch (_) {}
}
