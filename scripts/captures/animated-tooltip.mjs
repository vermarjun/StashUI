/**
 * Capture choreography for: animated-tooltip
 * Component: registry/aceternity-ui/animated-tooltip.tsx
 * Behaviour: A row of overlapping avatar circles. Hovering each avatar pops a
 * spring-animated tooltip (name + designation on a black card) above it.
 * Choreography: hover avatar 1 → dwell (tooltip visible) → avatar 2 → dwell →
 * avatar 3 → dwell → move away → rest.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Give framer-motion and images time to settle
  try {
    await wait(600);
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }

  // Locate all avatar images in the demo
  const avatars = page.locator('img[alt]');

  // Hover avatar 1 — tooltip should pop above
  try {
    const box1 = await avatars.nth(0).boundingBox({ timeout: 4000 });
    if (!box1) throw new Error('avatar 0 not found');
    const cx1 = box1.x + box1.width / 2;
    const cy1 = box1.y + box1.height / 2;
    await page.mouse.move(cx1, cy1, { steps: 14 });
    await wait(1700); // spring settle + tooltip fully visible
  } catch (err) {
    console.error('[animated-tooltip] avatar 0 hover error:', err.message);
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
    console.error('[animated-tooltip] avatar 1 hover error:', err.message);
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
    console.error('[animated-tooltip] avatar 2 hover error:', err.message);
  }

  // Move away so tooltips dismiss and the avatar row is fully visible
  try {
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 14 });
    await wait(500);
  } catch { /* ignore */ }
}
