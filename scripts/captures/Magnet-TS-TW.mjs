/**
 * Capture choreography for Magnet-TS-TW
 *
 * Magnet listens to global `mousemove` and translates its inner child toward
 * the cursor when the pointer is within (width/2 + padding=100) px of the
 * element's centre. The demo renders the component with no children, so the
 * wrapper itself is the magnetic target.
 *
 * Strategy:
 *   1. Locate the magnet wrapper; fall back to the page centre if not found.
 *   2. Slowly orbit the element centre — first a wide ellipse just outside the
 *      padding boundary so the "snap active" state is clearly shown, then a
 *      tight spiral that passes through centre so the full displacement range
 *      is demonstrated.
 *   3. Let the element spring back (inactiveTransition 0.5 s) and end near
 *      start for a clean loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle
  try {
    await wait(400);
  } catch (_) {}

  // Locate the magnet element centre; fall back to viewport centre
  let cx = W / 2;
  let cy = H / 2;
  try {
    const el = page.locator('[class*="inline-block"]').first();
    const box = await el.boundingBox();
    if (box) {
      cx = box.x + box.width / 2;
      cy = box.y + box.height / 2;
    }
  } catch (_) {}

  const STEPS = 28;

  // Approach slowly from outside the padding zone
  try {
    await page.mouse.move(cx + 160, cy, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Slow clockwise orbit entering the magnetic zone
  try {
    for (let i = 0; i <= STEPS; i++) {
      const angle = (i / STEPS) * 2 * Math.PI;
      const r = 80; // inside padding=100, so magnet is active
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle) * 0.7;
      await page.mouse.move(x, y, { steps: 4 });
      await wait(30);
    }
  } catch (_) {}

  // Pass through centre to show maximum pull
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(400);
  } catch (_) {}

  // Tight figure-8 through the element
  try {
    const pts = [
      [cx + 40, cy - 30],
      [cx, cy],
      [cx - 40, cy + 30],
      [cx, cy],
      [cx + 40, cy + 30],
      [cx, cy],
      [cx - 40, cy - 30],
      [cx, cy]
    ];
    for (const [x, y] of pts) {
      await page.mouse.move(x, y, { steps: 12 });
      await wait(180);
    }
  } catch (_) {}

  // Retreat outside the padding zone so the element springs back
  try {
    await page.mouse.move(cx + 220, cy, { steps: 18 });
    await wait(700);
  } catch (_) {}

  // Return to near-start
  try {
    await page.mouse.move(cx + 160, cy, { steps: 12 });
    await wait(200);
  } catch (_) {}
}
