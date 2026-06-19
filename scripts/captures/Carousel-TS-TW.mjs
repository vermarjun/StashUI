/**
 * Capture choreography: Carousel-TS-TW (react-bits)
 *
 * A draggable card carousel with dot-pagination and optional autoplay.
 * The demo renders with autoplay=false, so we drive it via:
 *   a) Click each dot button (aria-label="Go to slide N") to jump slides.
 *   b) Also perform a drag-left gesture on the track to show the drag UX.
 *
 * Strategy:
 *   1. Wait for the carousel container (rounded-[24px] border) to appear.
 *   2. Dwell on slide 1.
 *   3. Click dot 2 (aria-label="Go to slide 2") — spring transition plays.
 *   4. Dwell, then click dot 3.
 *   5. Dwell, then drag the track leftward to advance to slide 4 (or 5).
 *   6. Dwell, then click dot 1 to wrap back to start.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the carousel container to mount
  try {
    await page.locator("div.rounded-\\[24px\\]").first().waitFor({
      state: "visible",
      timeout: 8000,
    });
  } catch {
    await wait(1000);
  }

  await wait(700);

  // Click dot 2
  try {
    await page.getByRole("button", { name: "Go to slide 2" }).click();
  } catch {
    // ignore
  }
  await wait(1200);

  // Click dot 3
  try {
    await page.getByRole("button", { name: "Go to slide 3" }).click();
  } catch {
    // ignore
  }
  await wait(1200);

  // Drag the carousel track leftward to advance one more slide
  try {
    const container = page.locator("div.rounded-\\[24px\\]").first();
    const box = await container.boundingBox();
    if (box) {
      const startX = box.x + box.width * 0.6;
      const startY = box.y + box.height * 0.4;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      const steps = 10;
      const dragDist = box.width * 0.55;
      for (let i = 1; i <= steps; i++) {
        await page.mouse.move(
          startX - (dragDist * i) / steps,
          startY,
          { steps: 1 }
        );
        await wait(30);
      }
      await page.mouse.up();
    }
  } catch {
    // ignore
  }

  await wait(1200);

  // Return to slide 1
  try {
    await page.getByRole("button", { name: "Go to slide 1" }).click();
  } catch {
    // ignore
  }

  await wait(1000);
}
