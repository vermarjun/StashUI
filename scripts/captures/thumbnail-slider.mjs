/**
 * Choreography: thumbnail-slider
 *
 * Component: ThumnailSlider (file: thumnail-slider.tsx) — Embla carousel with
 * ThumbsSlider auto-generated from thumbnailSrc props. 7 Unsplash images.
 * Main slide is w-full, tall (xl:400px). Thumbnails are shown below as a
 * horizontal scrolling strip (basis-[15%] h-24). Clicking a thumbnail calls
 * onThumbClick(index) → scrolls the main carousel to that slide.
 *
 * Strategy: click thumbnail 2 → thumbnail 4 → thumbnail 6 to jump the main
 * image, showing the slide transition and thumbnail highlight change.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow Embla + ThumbsSlider to init and images to start loading.
  try {
    await wait(1100);
  } catch (_) {}

  // Thumbnails are rendered as <div onClick> elements inside the ThumbsSlider.
  // They are img tags inside shrink-0 divs with border-2 rounded-md.
  // The thumbnail strip is below the main image, roughly in the bottom 20% of H.

  async function clickThumbnail(idx) {
    try {
      // Thumbnail divs contain <img> tags. Select by their img src attribute
      // position — each thumb wraps an <img> inside a clickable div.
      const thumbs = page.locator('[class*="shrink-0"][class*="cursor-pointer"]');
      const count = await thumbs.count();
      if (count > idx) {
        const box = await thumbs.nth(idx).boundingBox();
        if (box) {
          const cx = Math.round(box.x + box.width / 2);
          const cy = Math.round(box.y + box.height / 2);
          await page.mouse.move(cx, cy, { steps: 6 });
          await wait(100);
          await page.mouse.click(cx, cy);
          return;
        }
      }
    } catch (_) {}
    // Fallback: thumbnails are in a horizontal row, bottom 20% of H.
    // 7 thumbs across 90% of width (component uses w-[90%] mx-auto).
    const stripLeft = Math.round(W * 0.05);
    const stripRight = Math.round(W * 0.95);
    const stripWidth = stripRight - stripLeft;
    const thumbW = Math.round(stripWidth / 7);
    const cx = Math.round(stripLeft + thumbW * idx + thumbW / 2);
    const cy = Math.round(H * 0.88);
    await page.mouse.move(cx, cy, { steps: 6 });
    await wait(100);
    try { await page.mouse.click(cx, cy); } catch (_) {}
  }

  // Click thumbnail 2 (index 1) — jump to second image.
  try {
    await clickThumbnail(1);
    await wait(700);
  } catch (_) {}

  // Click thumbnail 4 (index 3) — jump to fourth image.
  try {
    await clickThumbnail(3);
    await wait(700);
  } catch (_) {}

  // Click thumbnail 6 (index 5) — jump to sixth image.
  try {
    await clickThumbnail(5);
    await wait(700);
  } catch (_) {}

  // Return to thumbnail 1 (index 0) to close the loop.
  try {
    await clickThumbnail(0);
    await wait(600);
  } catch (_) {}

  // Park mouse at neutral centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.35), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
