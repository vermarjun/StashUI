// Vertical thumbnail slider (embla axis:'y', manual navigation via ThumbsSlider)
// The ThumbsSlider renders a vertical column of small thumbnail buttons on the
// LEFT side of the layout (direction:'rtl' + w-20 strip).  Clicking a thumbnail
// jumps the main viewport to that slide.
// Strategy: click thumbnail 2, then 4, then 1 – three distinct jumps.
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for embla init and images
  await wait(900);

  // The ThumbsSlider is a vertical strip ~80px wide on the left side of the
  // carousel.  Thumbnail buttons are stacked vertically inside it.
  // The carousel wrapper fills most of the viewport width.
  // ThumbsSlider sits at x≈W*0.05..W*0.1, y spread across the 400px height.
  // Each of 7 thumbnails occupies ~400/7 ≈ 57 px height.
  // Carousel top offset ≈ H*0.1 (py-0 wrapper, no extra padding in this variant).

  const thumbX = W * 0.06; // centre of the ~80px thumb strip
  const carouselTop = H * 0.08;
  const thumbHeight = 57; // approx px per thumb at 400px total / 7 slides

  // ── click thumbnail index 1 (2nd slide) ──────────────────────────────────
  try {
    const thumbY1 = carouselTop + thumbHeight * 1 + thumbHeight / 2;
    await page.mouse.click(thumbX, thumbY1);
  } catch (_) {}
  await wait(800);

  // ── click thumbnail index 3 (4th slide) ──────────────────────────────────
  try {
    const thumbY3 = carouselTop + thumbHeight * 3 + thumbHeight / 2;
    await page.mouse.click(thumbX, thumbY3);
  } catch (_) {}
  await wait(800);

  // ── click thumbnail index 5 (6th slide) ──────────────────────────────────
  try {
    const thumbY5 = carouselTop + thumbHeight * 5 + thumbHeight / 2;
    await page.mouse.click(thumbX, thumbY5);
  } catch (_) {}
  await wait(800);

  // ── return to thumbnail index 0 ──────────────────────────────────────────
  try {
    const thumbY0 = carouselTop + thumbHeight / 2;
    await page.mouse.click(thumbX, thumbY0);
  } catch (_) {}
  await wait(600);
}
