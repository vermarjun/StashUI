/**
 * Capture choreography for photo-gallery
 *
 * The gallery renders diamond-shaped images in a CSS grid.
 * On hover each cell expands from a clipped diamond to a full rectangle,
 * while other cells dim via :has() + filter.
 * Strategy:
 *   1. Settle so images load.
 *   2. Sweep over several thumbnails to show the expand + dim effect.
 *   3. Pause on a cell so the expanded state is visible.
 *   4. Retreat mouse back near start for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for images to load and grid to render
  try {
    await wait(900);
  } catch (_) {}

  // Locate gallery images by their pg-img class
  // Move over the 2nd image to trigger expand
  try {
    const imgs = page.locator('.pg-img');
    const count = await imgs.count();
    if (count > 1) {
      const box1 = await imgs.nth(1).boundingBox();
      if (box1) {
        await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2, { steps: 10 });
        await wait(600);
      }
    }
  } catch (_) {}

  // Move to 4th image
  try {
    const imgs = page.locator('.pg-img');
    const count = await imgs.count();
    if (count > 3) {
      const box3 = await imgs.nth(3).boundingBox();
      if (box3) {
        await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2, { steps: 12 });
        await wait(650);
      }
    }
  } catch (_) {}

  // Move to 6th image (next row)
  try {
    const imgs = page.locator('.pg-img');
    const count = await imgs.count();
    if (count > 5) {
      const box5 = await imgs.nth(5).boundingBox();
      if (box5) {
        await page.mouse.move(box5.x + box5.width / 2, box5.y + box5.height / 2, { steps: 12 });
        await wait(650);
      }
    }
  } catch (_) {}

  // Hover the 8th image and pause to show a clear expanded state
  try {
    const imgs = page.locator('.pg-img');
    const count = await imgs.count();
    if (count > 7) {
      const box7 = await imgs.nth(7).boundingBox();
      if (box7) {
        await page.mouse.move(box7.x + box7.width / 2, box7.y + box7.height / 2, { steps: 10 });
        await wait(800);
      }
    }
  } catch (_) {}

  // Retreat to top-left area near the first image — clean loop seam
  try {
    const imgs = page.locator('.pg-img');
    const box0 = await imgs.nth(0).boundingBox();
    if (box0) {
      await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2, { steps: 14 });
      await wait(400);
    } else {
      await page.mouse.move(W * 0.2, H * 0.35, { steps: 14 });
      await wait(400);
    }
  } catch (_) {}
}
