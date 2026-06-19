/**
 * Capture choreography for: aceternity-ui-3d-pin (shared source: 3d-pin.tsx)
 * Behaviour: A card tilts in 3-D perspective on hover — the front panel
 * rotates on the X axis and a cyan glowing pin + ripple rings appear above it.
 * Choreography: rest → enter card → dwell showing tilt + pin → drift within
 * card → exit card → rest for clean loop.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  const card = page.locator('a.group\\/pin').first();

  // --- Initial rest ---
  try {
    await wait(400);
    await page.mouse.move(W * 0.5, H * 0.15, { steps: 8 });
    await wait(300);
  } catch { /* ignore */ }

  // --- Enter card, trigger 3-D tilt ---
  try {
    const box = await card.boundingBox({ timeout: 3000 });
    if (!box) throw new Error('card not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Glide onto the card
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(900); // tilt transition (700 ms) + pin fade-in

    // Drift to show the perspective shift is live
    await page.mouse.move(cx - 30, cy - 20, { steps: 10 });
    await wait(400);
    await page.mouse.move(cx + 30, cy + 20, { steps: 10 });
    await wait(400);

    // Return to centre — ripple rings animating
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(700);

    // Exit card — tilt resets, pin fades out
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 14 });
    await wait(600);
  } catch (err) {
    console.error('[aceternity-ui-3d-pin] choreography error:', err.message);
  }

  // --- Rest at top for clean loop ---
  try {
    await wait(300);
  } catch { /* ignore */ }
}
