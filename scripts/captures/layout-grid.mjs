/**
 * Capture choreography for layout-grid (Aceternity UI)
 *
 * The LayoutGrid renders 4 image cards in a 3-column CSS grid.
 * Cards 1 and 4 span 2 columns (md:col-span-2); cards 2 and 3 span 1.
 * Clicking a card expands it to a centered overlay with a label; clicking
 * outside (or anywhere on the backdrop) collapses it.
 *
 * Strategy:
 *   1. Wait ~900ms for images to load and Framer Motion layout to settle.
 *   2. Click the first wide card (Tokyo) → expand → dwell → click outside.
 *   3. Click the small card (Santorini) → expand → dwell → click outside.
 *   4. Click the second wide card (Patagonia) → expand → dwell → click outside.
 *   5. Return mouse to top-center for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Initial settle — images need time to load from picsum
  try {
    await wait(900);
  } catch (_) {}

  // Helper: click the semi-transparent backdrop to dismiss expanded card
  const dismiss = async () => {
    try {
      // The backdrop is an absolutely-positioned div covering the grid.
      // Clicking near the very top-left corner of the container hits it
      // without landing on any card.
      await page.mouse.click(W * 0.08, H * 0.08);
      await wait(500);
    } catch (_) {}
  };

  // --- Click card 1: Tokyo (wide, top-left area) ---
  try {
    const card1 = page.locator('img[alt="thumbnail"]').nth(0);
    const box1 = await card1.boundingBox();
    if (box1) {
      await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2, { steps: 10 });
      await wait(200);
      await page.mouse.click(box1.x + box1.width / 2, box1.y + box1.height / 2);
      await wait(700);
    }
  } catch (_) {}

  await dismiss();

  // --- Click card 2: Santorini (small, top-right) ---
  try {
    const card2 = page.locator('img[alt="thumbnail"]').nth(1);
    const box2 = await card2.boundingBox();
    if (box2) {
      await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 10 });
      await wait(200);
      await page.mouse.click(box2.x + box2.width / 2, box2.y + box2.height / 2);
      await wait(700);
    }
  } catch (_) {}

  await dismiss();

  // --- Click card 4: Patagonia (wide, bottom row) ---
  try {
    const card4 = page.locator('img[alt="thumbnail"]').nth(3);
    const box4 = await card4.boundingBox();
    if (box4) {
      await page.mouse.move(box4.x + box4.width / 2, box4.y + box4.height / 2, { steps: 10 });
      await wait(200);
      await page.mouse.click(box4.x + box4.width / 2, box4.y + box4.height / 2);
      await wait(700);
    }
  } catch (_) {}

  await dismiss();

  // Return near start position for a clean loop seam
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 12 });
    await wait(300);
  } catch (_) {}
}
