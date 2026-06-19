export default async function capture(page, { W, H, cfg, wait }) {
  // Locate the icon grid container — the 4-col grid that holds all the cards
  const grid = page.locator('.grid.grid-cols-4').first();

  // Wait for the background image to paint and the glass cards to mount
  try {
    await grid.waitFor({ state: 'visible', timeout: 4000 });
  } catch (_) {}
  await wait(600);

  // Helper: smooth mouse sweep across a horizontal span at a fixed Y
  async function sweep(x0, y0, x1, y1, steps = 30, ms = 800) {
    try {
      await page.mouse.move(x0, y0);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        await page.mouse.move(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
        await wait(ms / steps);
      }
    } catch (_) {}
  }

  // --- Phase 1: slow sweep across the top row of icons (left → right) ---
  // Top row sits roughly in the upper-third of the grid vertically;
  // center of that row at ~30% of H, spanning 20%–80% of W
  const rowY1 = H * 0.30;
  await sweep(W * 0.18, rowY1, W * 0.82, rowY1, 40, 1200);
  await wait(300);

  // --- Phase 2: hover the Bell icon (2nd icon, top row) and linger ---
  try {
    const bell = page.getByRole('img', { hidden: true }).filter({ hasText: /bell/i });
    // Prefer sr-only text fallback
  } catch (_) {}
  // Use the sr-only label to find the Notifications card
  try {
    const notif = page.locator('span.sr-only').filter({ hasText: 'Notifications' });
    const notifBox = await notif.boundingBox();
    if (notifBox) {
      const cx = notifBox.x + notifBox.width / 2;
      const cy = notifBox.y + notifBox.height / 2;
      await page.mouse.move(cx, cy, { steps: 10 });
      await wait(500);
      // Light tap to trigger whileTap scale
      await page.mouse.down();
      await wait(150);
      await page.mouse.up();
      await wait(400);
    }
  } catch (_) {}

  // --- Phase 3: drag the Flashlight card a little (draggable=true, elastic) ---
  try {
    const flash = page.locator('span.sr-only').filter({ hasText: 'Flashlight' });
    const fBox = await flash.boundingBox();
    if (fBox) {
      const cx = fBox.x + fBox.width / 2;
      const cy = fBox.y + fBox.height / 2;
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(200);
      await page.mouse.down();
      await wait(100);
      // Drag diagonally — elastic spring will snap back
      await page.mouse.move(cx + 28, cy - 22, { steps: 15 });
      await wait(300);
      await page.mouse.up();
      await wait(600); // let it spring back
    }
  } catch (_) {}

  // --- Phase 4: sweep back right-to-left across the bottom row ---
  // Bottom row icons at ~72% of H
  const rowY2 = H * 0.72;
  await sweep(W * 0.82, rowY2, W * 0.18, rowY2, 40, 1000);
  await wait(300);

  // --- Phase 5: hover the tall Sun/Brightness pill (col 3, rows 1-2) ---
  try {
    const sun = page.locator('span.sr-only').filter({ hasText: 'Brightness' });
    const sBox = await sun.boundingBox();
    if (sBox) {
      const cx = sBox.x + sBox.width / 2;
      const cy = sBox.y + sBox.height / 2;
      await page.mouse.move(cx, cy, { steps: 12 });
      await wait(600);
    }
  } catch (_) {}

  // --- Phase 6: gentle diagonal sweep to produce glass distortion wave ---
  await sweep(W * 0.15, H * 0.25, W * 0.85, H * 0.75, 50, 1200);
  await wait(400);

  // Return mouse near center to keep a card hovered in the final frame
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
  } catch (_) {}
  await wait(300);
}
