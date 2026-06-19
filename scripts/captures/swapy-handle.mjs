/**
 * Capture choreography for swapy-handle.
 *
 * Cards have an explicit DragHandle icon inside each SwapyItem.
 * Strategy: locate the drag-handle icon (the first [data-swapy-handle] or
 * a grip SVG), grab it, drag the card to an adjacent slot, settle, then
 * do a second grab of another handle for a second swap.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let swapy + handle icons render
  try {
    await wait(700);
  } catch (_) {}

  // ── Helper: drag from (sx,sy) to (tx,ty) using the handle ──────────────────
  async function dragHandle(sx, sy, tx, ty) {
    try {
      // Find the handle near (sx, sy) — try data-swapy-handle attribute first
      let handleX = sx;
      let handleY = sy - 30; // handle sits near top of card
      try {
        const handles = page.locator('[data-swapy-handle]');
        const count = await handles.count();
        if (count > 0) {
          // Pick the handle whose bounding box centre is closest to (sx,sy)
          let best = null;
          let bestDist = Infinity;
          for (let i = 0; i < count; i++) {
            const box = await handles.nth(i).boundingBox();
            if (!box) continue;
            const cx = box.x + box.width / 2;
            const cy = box.y + box.height / 2;
            const d = Math.hypot(cx - sx, cy - sy);
            if (d < bestDist) { bestDist = d; best = { cx, cy }; }
          }
          if (best) { handleX = best.cx; handleY = best.cy; }
        }
      } catch (_) {}

      await page.mouse.move(handleX, handleY, { steps: 6 });
      await wait(100);
      await page.mouse.down();
      await wait(150);
      const steps = 12;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        await page.mouse.move(
          handleX + (tx - handleX) * t,
          handleY + (ty - handleY) * t
        );
        await wait(40);
      }
      await wait(450);
      await page.mouse.up();
      await wait(650);
    } catch (_) {}
  }

  // Grid is 12-col, 2 rows of cards (row heights ~H*0.45 each inside preview).
  // Approximate card centres for a 1100×688 viewport.
  const row1Y = Math.round(H * 0.3);
  const row2Y = Math.round(H * 0.7);

  // Card 1 → Card 2 (top row, left to mid-left)
  await dragHandle(
    Math.round(W * 0.15), row1Y,
    Math.round(W * 0.38), row1Y
  );

  // Card 4 → Card 5 (bottom row, left to mid)
  await dragHandle(
    Math.round(W * 0.22), row2Y,
    Math.round(W * 0.55), row2Y
  );

  // Move mouse away
  try {
    await page.mouse.move(W / 2, H * 0.02, { steps: 8 });
    await wait(400);
  } catch (_) {}
}
