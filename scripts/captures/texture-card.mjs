/**
 * Capture choreography for texture-card
 *
 * TextureCard has layered concentric borders (4 divs deep) creating a raised
 * texture. There is no explicit hover animation defined on the card root, so
 * the choreography focuses on a slow hover-dwell that shows off the border
 * layering, then retreats.
 *
 * Strategy:
 *   1. Settle off-card.
 *   2. Drift onto the card slowly so the viewer can read the layered texture.
 *   3. Dwell.
 *   4. Move away — rest.
 *   5. Repeat once more.
 *   6. End off-card.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Start off the card (above)
  try {
    await wait(400);
    await page.mouse.move(cx, H * 0.1, { steps: 6 });
    await wait(300);
  } catch (_) {}

  // Drift onto the card
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(950);
  } catch (_) {}

  // Move off to the right
  try {
    await page.mouse.move(cx + 220, cy - 20, { steps: 16 });
    await wait(550);
  } catch (_) {}

  // Second hover
  try {
    await page.mouse.move(cx - 10, cy + 10, { steps: 20 });
    await wait(950);
  } catch (_) {}

  // End above card
  try {
    await page.mouse.move(cx, H * 0.1, { steps: 16 });
    await wait(400);
  } catch (_) {}
}
