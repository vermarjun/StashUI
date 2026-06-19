/**
 * Capture choreography for components-community-pin-list
 *
 * The PinList component splits items into "pinned" and "unpinned" sections.
 * Clicking any item calls toggleStatus() — pinned items unpin (move to
 * unpinned), unpinned items pin (move to pinned section) with a spring layout
 * animation (layoutId per item).
 *
 * Initial state: 2 pinned (Home, Starred), 4 unpinned (Notifications …).
 *
 * Strategy:
 *   1. Dwell so layout settles and viewer reads the initial state.
 *   2. Hover over "Notifications" (3rd overall item, 1st unpinned) so the
 *      ghost pin icon fades in via group-hover.
 *   3. Click it — it springs up into the pinned section (3 pinned now).
 *   4. Dwell to show the new pinned state.
 *   5. Hover over "Settings" (now 2nd unpinned) and click to pin a second item.
 *   6. Dwell.
 *   7. Click "Notifications" in the pinned section to unpin it — springs back down.
 *   8. Click the other newly-pinned item to unpin it — back to near-start state.
 *   9. Retreat mouse.
 *
 * Items are motion.div elements; we target by text content using :has() or
 * getByText locators for reliability.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the layout render and spring settle
  try {
    await wait(700);
  } catch (_) {}

  // Helper: find an item card by its visible label text and return its bounding box
  const getItemBox = async (label) => {
    const el = page.locator(`text="${label}"`).first();
    return el.boundingBox();
  };

  // --- Hover "Notifications" to reveal ghost pin icon ---
  try {
    const box = await getItemBox('Notifications');
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await wait(500);
    }
  } catch (_) {}

  // --- Click "Notifications" to pin it ---
  try {
    const box = await getItemBox('Notifications');
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await wait(800);
    }
  } catch (_) {}

  // --- Hover "Settings" so ghost pin fades in ---
  try {
    const box = await getItemBox('Settings');
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await wait(450);
    }
  } catch (_) {}

  // --- Click "Settings" to pin it ---
  try {
    const box = await getItemBox('Settings');
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await wait(800);
    }
  } catch (_) {}

  // Dwell so viewer sees four pinned items
  try {
    await wait(600);
  } catch (_) {}

  // --- Unpin "Notifications" (click in pinned section to toggle back) ---
  try {
    const box = await getItemBox('Notifications');
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(300);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await wait(700);
    }
  } catch (_) {}

  // --- Unpin "Settings" — returns to original 2-pinned state ---
  try {
    const box = await getItemBox('Settings');
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(300);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await wait(600);
    }
  } catch (_) {}

  // Retreat mouse to neutral — loop seam clean
  try {
    await page.mouse.move(W / 2, H * 0.08, { steps: 12 });
    await wait(400);
  } catch (_) {}
}
