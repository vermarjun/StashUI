/**
 * Capture choreography for: aceternity-ui-animated-tooltip
 * Shared source: registry/aceternity-ui/animated-tooltip.tsx
 * Same demo as animated-tooltip — a row of overlapping avatar circles; hovering
 * each avatar springs a tooltip card (name + designation) above it.
 * Choreography: hover avatar 1 → dwell → avatar 2 → dwell → avatar 3 → dwell
 * → move away → rest.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Let images and framer-motion hydrate
  try {
    await wait(600);
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }

  const avatars = page.locator('img[alt]');

  // Hover avatar 1
  try {
    const box1 = await avatars.nth(0).boundingBox({ timeout: 4000 });
    if (!box1) throw new Error('avatar 0 not found');
    const cx1 = box1.x + box1.width / 2;
    const cy1 = box1.y + box1.height / 2;
    await page.mouse.move(cx1, cy1, { steps: 14 });
    await wait(1700);
  } catch (err) {
    console.error('[aceternity-ui-animated-tooltip] avatar 0 error:', err.message);
  }

  // Hover avatar 2
  try {
    const box2 = await avatars.nth(1).boundingBox({ timeout: 3000 });
    if (!box2) throw new Error('avatar 1 not found');
    const cx2 = box2.x + box2.width / 2;
    const cy2 = box2.y + box2.height / 2;
    await page.mouse.move(cx2, cy2, { steps: 10 });
    await wait(1700);
  } catch (err) {
    console.error('[aceternity-ui-animated-tooltip] avatar 1 error:', err.message);
  }

  // Hover avatar 3
  try {
    const box3 = await avatars.nth(2).boundingBox({ timeout: 3000 });
    if (!box3) throw new Error('avatar 2 not found');
    const cx3 = box3.x + box3.width / 2;
    const cy3 = box3.y + box3.height / 2;
    await page.mouse.move(cx3, cy3, { steps: 10 });
    await wait(1700);
  } catch (err) {
    console.error('[aceternity-ui-animated-tooltip] avatar 2 error:', err.message);
  }

  // Move away — tooltips dismiss, avatar row stays visible
  try {
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 14 });
    await wait(500);
  } catch { /* ignore */ }
}
