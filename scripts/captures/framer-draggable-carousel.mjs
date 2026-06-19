// Framer draggable carousel – drag the track left (revealing next slides) twice,
// then drag right once to return near the start.
// The motion.div (drag='x') covers the full carousel width.
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for images and layout
  await wait(900);

  // Carousel image track bounds (lg:p-10 padding).
  // Image container: x≈40..W-40, y≈H*0.12, height 400px.
  const carouselTop = H * 0.12;
  const carouselMidY = carouselTop + 200;
  const startX = W * 0.55; // right-centre of carousel – start drag from here
  const dragDist = Math.round(W * 0.42); // drag ~42% of viewport left

  // ── first drag left (advance to slide 2) ─────────────────────────────────
  try {
    await page.mouse.move(startX, carouselMidY);
    await wait(60);
    await page.mouse.down();
    await wait(80);
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(startX - dragDist * (i / 10), carouselMidY, { steps: 1 });
      await wait(20);
    }
    await wait(100);
    await page.mouse.up();
  } catch (_) {
    try { await page.mouse.up(); } catch (__) {}
  }
  await wait(700);

  // ── second drag left (advance to slide 3) ────────────────────────────────
  try {
    await page.mouse.move(startX, carouselMidY);
    await wait(60);
    await page.mouse.down();
    await wait(80);
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(startX - dragDist * (i / 10), carouselMidY, { steps: 1 });
      await wait(20);
    }
    await wait(100);
    await page.mouse.up();
  } catch (_) {
    try { await page.mouse.up(); } catch (__) {}
  }
  await wait(700);

  // ── drag right (go back one slide) ───────────────────────────────────────
  try {
    const backStart = W * 0.3;
    await page.mouse.move(backStart, carouselMidY);
    await wait(60);
    await page.mouse.down();
    await wait(80);
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(backStart + dragDist * (i / 10), carouselMidY, { steps: 1 });
      await wait(20);
    }
    await wait(100);
    await page.mouse.up();
  } catch (_) {
    try { await page.mouse.up(); } catch (__) {}
  }
  await wait(600);
}
