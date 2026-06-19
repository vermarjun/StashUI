/**
 * Capture choreography for: glowing-stars
 * Behaviour: A dark card containing an 18×6 grid of tiny stars. At rest, 5
 * random stars twinkle every 3 s. On mouseenter ALL stars glow in a cascade
 * (staggered by index). Choreography: dwell at rest to catch one twinkle
 * wave → enter card → dwell across the cascade glow → exit → dwell → repeat
 * enter for a second cascade visible in the loop.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  const card = page.locator('[class*="max-w-md"]').first();

  // --- Initial dwell — catch the auto-twinkle cycle ---
  try {
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 6 });
    await wait(900);
  } catch { /* ignore */ }

  // --- Enter the card — all stars cascade-glow ---
  try {
    const box = await card.boundingBox({ timeout: 3000 });
    if (!box) throw new Error('card not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Glide onto card from top
    await page.mouse.move(cx, box.y + 20, { steps: 12 });
    await wait(300);
    // Move across the star grid to trigger full glow
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(1200); // cascade takes ~1 s to propagate
  } catch (err) {
    console.error('[glowing-stars] enter error:', err.message);
  }

  // --- Drift across card while glowing ---
  try {
    const box = await card.boundingBox({ timeout: 2000 });
    if (box) {
      await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5, { steps: 12 });
      await wait(400);
      await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5, { steps: 12 });
      await wait(400);
    }
  } catch { /* ignore */ }

  // --- Exit card — stars revert to sparse twinkle ---
  try {
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 14 });
    await wait(600);
  } catch { /* ignore */ }

  // --- Second enter for loop continuity ---
  try {
    const box = await card.boundingBox({ timeout: 2000 });
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 16 });
      await wait(800);
      // Drift slightly then exit
      await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3, { steps: 8 });
      await wait(400);
      await page.mouse.move(W * 0.5, H * 0.1, { steps: 12 });
      await wait(400);
    }
  } catch { /* ignore */ }
}
