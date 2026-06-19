/**
 * Capture choreography: Stack-TS-TW (react-bits)
 *
 * A draggable card stack where dragging the top card past the sensitivity
 * threshold (200 px) sends it to the back, revealing the next card with a
 * rotateZ + scale spring animation.
 *
 * The stack defaults to 4 image cards stacked with a slight rotateZ offset.
 * dragElastic=0.6, dragConstraints pinned to origin — drag it past 200 px and
 * release to trigger `onSendToBack`.
 *
 * Strategy:
 *   1. Wait for the stack to mount (look for the absolute-positioned container).
 *   2. Locate the top card (last child of the stack — highest z due to absolute
 *      positioning with LIFO render order).
 *   3. Drag it diagonally off to the upper-right (~240 px) and release.
 *      Spring snaps to (0,0) first then `sendToBack` fires on dragEnd.
 *   4. Dwell for spring animation (~600 ms).
 *   5. Repeat drag-off 2 more times.
 *   6. Dwell on the final resting stack.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the stack container
  try {
    await page.locator("div.relative.w-full.h-full").first().waitFor({
      state: "visible",
      timeout: 8000,
    });
  } catch {
    await wait(1000);
  }

  await wait(700);

  // Helper: drag the top card off by (dx, dy) relative to its centre
  async function dragTopCardOff(dx, dy) {
    try {
      // The top card is the last absolute-positioned motion div in the stack
      const cards = page.locator("div.absolute.inset-0.cursor-grab");
      const count = await cards.count();
      if (count === 0) return;

      const topCard = cards.nth(count - 1);
      const box = await topCard.boundingBox();
      if (!box) return;

      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;

      await page.mouse.move(cx, cy);
      await page.mouse.down();

      const steps = 12;
      for (let i = 1; i <= steps; i++) {
        await page.mouse.move(
          cx + (dx * i) / steps,
          cy + (dy * i) / steps,
          { steps: 1 }
        );
        await wait(25);
      }
      await page.mouse.up();
    } catch {
      // ignore
    }
  }

  // Drag 1: top card off to upper-right
  await dragTopCardOff(260, -120);
  await wait(900);

  // Drag 2: new top card off to lower-right
  await dragTopCardOff(240, 140);
  await wait(900);

  // Drag 3: send another card to back
  await dragTopCardOff(200, -160);
  await wait(900);

  // Dwell on the resulting stack arrangement
  await wait(600);

  // Move mouse to neutral so the final frame is clean
  await page.mouse.move(W / 2, H - 30);
  await wait(300);
}
