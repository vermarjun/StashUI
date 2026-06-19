export default async function capture(page, { W, H, cfg, wait }) {
  // The Swapy grid is 3 columns (3fr 5fr 2fr) × 3 rows, each row h-32 (~128px),
  // gap-4 (~16px). Component fills full width at W=1100.
  // Approximate column widths: col0≈300px, col1≈500px, col2≈200px (with 16px gaps).
  // col0 center x ≈ 150; col1 center x ≈ 566; col2 center x ≈ 932
  // Row centers (y) with ~32px top padding: row0≈96, row1≈240, row2≈384

  const col0 = Math.round(W * 0.136);  // ~150
  const col1 = Math.round(W * 0.515);  // ~566
  const row0 = Math.round(H * 0.14);   // ~96
  const row1 = Math.round(H * 0.35);   // ~240
  const row2 = Math.round(H * 0.56);   // ~385

  // Slot A (emerald, row0 col0) → swap with slot D (purple, row1 col0)
  const ax = col0, ay = row0;
  const dx = col0, dy = row1;

  // Give Swapy time to initialise
  await wait(600);

  // --- Drag A down to D (vertical swap in column 0) ---
  try {
    await page.mouse.move(ax, ay);
    await wait(120);
    await page.mouse.down();
    await wait(150);

    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      const x = ax + (dx - ax) * (i / steps);
      const y = ay + (dy - ay) * (i / steps);
      await page.mouse.move(x, y);
      await wait(40);
    }
    await wait(200);
    await page.mouse.up();
  } catch (_) {}

  // Settle after swap
  await wait(700);

  // --- Swap item B (rose, row0 col1, has handle) with item G (green, row2 col1) ---
  // B has a handle at top-left of cell; grab handle offset (~18px from cell left, 22px from top)
  const bHandleX = col1 - Math.round(W * 0.207);  // left edge of col1 + 18 ≈ col1-230+18
  const bHandleY = row0 - Math.round(H * 0.07);   // top of row0 + 22

  // Simpler: just use cell centers (Swapy also allows dragging non-handle area for non-handle items)
  // For B (has handle) we target the handle
  const bx = col1 - 220 + 18;  // left of col1 block + handle offset
  const bHandleActualX = Math.max(320, Math.round(col1 - 230));
  const bHandleActualY = Math.round(row0 - 42);

  const gx = col1, gy = row2;

  try {
    // Drag from B cell center to G cell center
    await page.mouse.move(col1, row0);
    await wait(120);
    await page.mouse.down();
    await wait(150);

    const steps2 = 14;
    for (let i = 1; i <= steps2; i++) {
      const x = col1 + (gx - col1) * (i / steps2);
      const y = row0 + (gy - row0) * (i / steps2);
      await page.mouse.move(x, y);
      await wait(35);
    }
    await wait(200);
    await page.mouse.up();
  } catch (_) {}

  await wait(600);

  // --- Swap A back: now A is at row1 col0, drag it back to row0 col0 ---
  try {
    await page.mouse.move(dx, dy);
    await wait(100);
    await page.mouse.down();
    await wait(120);

    const steps3 = 10;
    for (let i = 1; i <= steps3; i++) {
      const x = dx + (ax - dx) * (i / steps3);
      const y = dy + (ay - dy) * (i / steps3);
      await page.mouse.move(x, y);
      await wait(40);
    }
    await wait(180);
    await page.mouse.up();
  } catch (_) {}

  await wait(500);
}
