/**
 * Capture choreography for: magnified-doc
 * Component: registry/ui-layouts/magnified-doc.tsx (Radix Tooltip primitives)
 * Demo: a macOS-style dock row. Each icon spring-magnifies as the cursor
 * approaches it (proximity effect via useTransform + useSpring), and a Radix
 * tooltip label pops above on hover.
 * Choreography: start far left of dock → sweep mouse slowly right across all
 * icons so each one swells in turn → pause on icon 3 (middle) so its tooltip
 * shows → continue sweep → move away → rest.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle framer-motion springs
  try {
    await wait(500);
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }

  // Locate the dock container
  const dock = page.locator('div.flex.items-end.gap-2').first();

  try {
    const box = await dock.boundingBox({ timeout: 4000 });
    if (!box) throw new Error('dock not found');

    const left  = box.x + 8;
    const right = box.x + box.width - 8;
    const cy    = box.y + box.height - 10; // near bottom of dock

    // Approach from the left, outside the dock
    await page.mouse.move(box.x - 60, cy, { steps: 8 });
    await wait(200);

    // Slow sweep across the entire dock (~80 steps ≈ ~2.5 s at 30 fps)
    await page.mouse.move(right, cy, { steps: 80 });
    await wait(300);

    // Hover icon 3 (middle) and dwell so tooltip appears
    const iconCount = 5;
    const iconStep = (right - left) / (iconCount - 1);
    const icon3x = left + iconStep * 2; // 0-indexed third icon
    await page.mouse.move(icon3x, cy, { steps: 10 });
    await wait(1800); // tooltip should open (delayDuration=0) and be fully visible

    // Slowly sweep back left
    await page.mouse.move(left, cy, { steps: 50 });
    await wait(300);

    // Move away — icons shrink, tooltip dismisses
    await page.mouse.move(box.x - 60, cy, { steps: 10 });
    await wait(400);
  } catch (err) {
    console.error('[magnified-doc] choreography error:', err.message);
  }

  // Rest near centre-bottom
  try {
    await page.mouse.move(W * 0.5, H * 0.9, { steps: 10 });
    await wait(300);
  } catch { /* ignore */ }
}
