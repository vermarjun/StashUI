// Framer moveable thumbnails carousel – drag the main track left twice (advance
// two slides), click thumbnail 3, click thumbnail 6, then return to slide 0
// via thumbnail 0.
// Main area: lg:p-10 pad, 400px image.  Thumbnails: h-16 (64px) strip below,
// each thumbnail button has inline aspectRatio (collapsed=1/3, active=16/9).
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for layout and images
  await wait(900);

  // Coordinates
  const carouselTop = 40; // lg:p-10
  const carouselMidY = carouselTop + 200; // mid of 400px image
  const dragStart = W * 0.55;
  const dragDist = Math.round(W * 0.42);

  // ── drag main track left (slide 0 → 1) ───────────────────────────────────
  try {
    await page.mouse.move(dragStart, carouselMidY);
    await wait(60);
    await page.mouse.down();
    await wait(80);
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(dragStart - dragDist * (i / 10), carouselMidY, { steps: 1 });
      await wait(20);
    }
    await wait(100);
    await page.mouse.up();
  } catch (_) {
    try { await page.mouse.up(); } catch (__) {}
  }
  await wait(700);

  // ── drag main track left again (slide 1 → 2) ─────────────────────────────
  try {
    await page.mouse.move(dragStart, carouselMidY);
    await wait(60);
    await page.mouse.down();
    await wait(80);
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(dragStart - dragDist * (i / 10), carouselMidY, { steps: 1 });
      await wait(20);
    }
    await wait(100);
    await page.mouse.up();
  } catch (_) {
    try { await page.mouse.up(); } catch (__) {}
  }
  await wait(700);

  // ── click thumbnail index 4 ───────────────────────────────────────────────
  // Thumbnail strip is below the gap-3 (12px) after the 400px image.
  // Strip: h-16 (64px). Centre y = carouselTop + 400 + 12 + 32.
  const thumbStripMidY = carouselTop + 400 + 12 + 32;
  const thumbButtons = () => page.locator('.flex.h-16 button, .flex.min-w-0 button');

  try {
    const btn = thumbButtons().nth(4);
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
  } catch (_) {}
  await wait(800);

  // ── click thumbnail index 7 ───────────────────────────────────────────────
  try {
    const btn = thumbButtons().nth(7);
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
  } catch (_) {}
  await wait(800);

  // ── return to thumbnail index 0 ──────────────────────────────────────────
  try {
    const btn = thumbButtons().nth(0);
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
  } catch (_) {}
  await wait(600);
}
