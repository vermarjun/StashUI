/**
 * Capture choreography for AnimatedList-TS-TW
 *
 * The component uses useInView to stagger items in as they become visible.
 * Strategy:
 *   1. Dwell briefly so all items animate in sequentially from the top.
 *   2. Hover item 0 (mouseenter sets selectedIndex → highlight).
 *   3. Move to item 2 — pause to show hover highlight transition.
 *   4. Move to item 4 — pause again.
 *   5. Retreat mouse to neutral so loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the component mount and all items stagger in
  try {
    await wait(1200);
  } catch (_) {}

  // Hover first visible item (the list sits in a scrollable div inside the component)
  // Items are rendered as `motion.div[data-index]` → target by data-index attribute
  try {
    const item0 = page.locator('[data-index="0"]').first();
    const box0 = await item0.boundingBox();
    if (box0) {
      await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2, { steps: 8 });
      await wait(500);
    }
  } catch (_) {}

  // Move to item 2
  try {
    const item2 = page.locator('[data-index="2"]').first();
    const box2 = await item2.boundingBox();
    if (box2) {
      await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 10 });
      await wait(550);
    }
  } catch (_) {}

  // Move to item 4
  try {
    const item4 = page.locator('[data-index="4"]').first();
    const box4 = await item4.boundingBox();
    if (box4) {
      await page.mouse.move(box4.x + box4.width / 2, box4.y + box4.height / 2, { steps: 10 });
      await wait(600);
    }
  } catch (_) {}

  // Click item 1 to show selected highlight
  try {
    const item1 = page.locator('[data-index="1"]').first();
    const box1 = await item1.boundingBox();
    if (box1) {
      await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(box1.x + box1.width / 2, box1.y + box1.height / 2);
      await wait(500);
    }
  } catch (_) {}

  // Retreat to top-center — near the start state so the loop seam is clean
  try {
    await page.mouse.move(W / 2, H * 0.12, { steps: 14 });
    await wait(400);
  } catch (_) {}
}
