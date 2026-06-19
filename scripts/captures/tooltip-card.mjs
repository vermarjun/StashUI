/**
 * Capture choreography for: tooltip-card
 * Component: registry/aceternity-ui/tooltip-card.tsx
 * Behaviour: A cursor-tracking tooltip (spring-animated, mouse-follow) appears
 * above/beside the hovered trigger. The card is position:absolute relative to
 * the container and follows the cursor until mouse-leave.
 * Choreography: hover button 1 → dwell with rich-content tooltip visible →
 * move mouse slightly within trigger to show tracking → move to button 2 →
 * dwell with string tooltip → move away → rest.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle layout
  try {
    await wait(400);
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }

  const buttons = page.getByRole('button');

  // Hover first button — rich-content tooltip appears
  try {
    const box1 = await buttons.nth(0).boundingBox({ timeout: 4000 });
    if (!box1) throw new Error('button 0 not found');
    const cx1 = box1.x + box1.width / 2;
    const cy1 = box1.y + box1.height / 2;
    await page.mouse.move(cx1, cy1, { steps: 16 });
    await wait(1600); // spring settle + tooltip fully visible

    // Drift slightly to show cursor-tracking behaviour
    await page.mouse.move(cx1 + 10, cy1 - 4, { steps: 6 });
    await wait(400);
    await page.mouse.move(cx1 - 8, cy1 + 4, { steps: 6 });
    await wait(400);
  } catch (err) {
    console.error('[tooltip-card] button 0 hover error:', err.message);
  }

  // Move between buttons (tooltip dismisses, then second one opens)
  try {
    const box2 = await buttons.nth(1).boundingBox({ timeout: 3000 });
    if (!box2) throw new Error('button 1 not found');
    const cx2 = box2.x + box2.width / 2;
    const cy2 = box2.y + box2.height / 2;
    await page.mouse.move(cx2, cy2, { steps: 18 });
    await wait(1700); // dwell with string tooltip
  } catch (err) {
    console.error('[tooltip-card] button 1 hover error:', err.message);
  }

  // Move away — tooltip dismisses
  try {
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 14 });
    await wait(400);
  } catch { /* ignore */ }
}
