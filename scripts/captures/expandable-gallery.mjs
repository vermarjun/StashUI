/**
 * Capture choreography for expandable-gallery
 *
 * The gallery renders a row of panels; hovering a panel expands it via
 * flex-[3] transition (500ms ease-in-out). The others shrink to flex-1.
 * Strategy:
 *   1. Settle so images load and the default state is visible.
 *   2. Hover panel 1 (second panel) → watch it expand.
 *   3. Slide to panel 3 → new expansion.
 *   4. Slide to panel 0 → first panel expands.
 *   5. Retreat to panel 2 (middle) for a symmetric loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Let images load
  try {
    await wait(900);
  } catch (_) {}

  // Target the expandable panels — they are the direct children of the flex container
  // The gallery container is identified by its overflow-hidden + rounded-xl children
  const panelSel = '.expandable-gallery > div, [class*="flex"][class*="h-96"] > div';

  // Helper: get bounding box of the nth panel
  const getPanelBox = async (n) => {
    try {
      const panels = page.locator('[class*="flex-1"][class*="cursor-pointer"]');
      const count = await panels.count();
      if (count > n) return panels.nth(n).boundingBox();
    } catch (_) {}
    return null;
  };

  // Hover panel index 1
  try {
    const box = await getPanelBox(1);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await wait(700);
    } else {
      // Fallback: move to ~30% width, mid-height
      await page.mouse.move(W * 0.30, H * 0.5, { steps: 10 });
      await wait(700);
    }
  } catch (_) {}

  // Hover panel index 3
  try {
    const box = await getPanelBox(3);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 14 });
      await wait(700);
    } else {
      await page.mouse.move(W * 0.70, H * 0.5, { steps: 14 });
      await wait(700);
    }
  } catch (_) {}

  // Hover panel index 4 (last panel)
  try {
    const box = await getPanelBox(4);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
      await wait(700);
    } else {
      await page.mouse.move(W * 0.88, H * 0.5, { steps: 12 });
      await wait(700);
    }
  } catch (_) {}

  // Hover panel index 0 (first panel)
  try {
    const box = await getPanelBox(0);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 14 });
      await wait(700);
    } else {
      await page.mouse.move(W * 0.10, H * 0.5, { steps: 14 });
      await wait(700);
    }
  } catch (_) {}

  // Retreat to panel 2 (middle) — neutral, symmetric loop seam
  try {
    const box = await getPanelBox(2);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 14 });
      await wait(500);
    } else {
      await page.mouse.move(W * 0.5, H * 0.5, { steps: 14 });
      await wait(500);
    }
  } catch (_) {}
}
