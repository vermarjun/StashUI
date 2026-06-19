/**
 * Choreography: FlowingMenu-TS-TW
 *
 * MENU type: hover each row (menuitem) to trigger the marquee slide-in effect.
 * 4 items stack vertically; each covers ~25% of the 500px container height.
 * Hover from the bottom edge to trigger the 'bottom' edge animation.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const rowH = Math.round(H / 4);

  // 1. Mount / marquee settle
  try { await wait(800); } catch (_) {}

  // 2. Hover row 0 (Home) — enter from top edge
  try {
    const y0 = Math.round(rowH * 0.5);
    await page.mouse.move(cx, y0 - 30, { steps: 4 }); // approach from above
    await page.mouse.move(cx, y0, { steps: 4 });
    await wait(600);
  } catch (_) {}

  // 3. Leave row 0, hover row 1 (Work)
  try {
    const y1 = Math.round(rowH * 1.5);
    await page.mouse.move(cx, y1 - 30, { steps: 6 });
    await page.mouse.move(cx, y1, { steps: 4 });
    await wait(600);
  } catch (_) {}

  // 4. Leave row 1, hover row 2 (About)
  try {
    const y2 = Math.round(rowH * 2.5);
    await page.mouse.move(cx, y2 - 30, { steps: 6 });
    await page.mouse.move(cx, y2, { steps: 4 });
    await wait(600);
  } catch (_) {}

  // 5. Leave row 2, hover row 3 (Contact)
  try {
    const y3 = Math.round(rowH * 3.5);
    await page.mouse.move(cx, y3 - 30, { steps: 6 });
    await page.mouse.move(cx, y3, { steps: 4 });
    await wait(600);
  } catch (_) {}

  // 6. Leave last row, return to first row — loop seam
  try {
    await page.mouse.move(cx, H + 10, { steps: 6 }); // exit bottom
    await wait(200);
    await page.mouse.move(cx, -10, { steps: 4 });     // reset above
    await wait(200);
    await page.mouse.move(cx, Math.round(rowH * 0.5), { steps: 6 });
    await wait(400);
  } catch (_) {}
}
