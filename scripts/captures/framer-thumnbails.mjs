// Framer thumbnails carousel – click 3 different thumbnails in the bottom strip
// to switch the main image, then return to thumbnail 0.
// The thumbnail strip (Thumbnails) renders below the main image.
// Each thumbnail is a motion.button.  The active one has width 120px, inactive 35px.
// Strip is inside .overflow-x-auto with height h-20 (80px).
// Layout: w-[80%] mx-auto with lg:p-10 padding → main body is ~W*0.8 centred.
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for images and thumbnail layout
  await wait(900);

  // The component is wrapped in w-[80%] mx-auto, so content x range:
  //   x_start = W * 0.1 + 40 (lg:p-10), x_end = W * 0.9 - 40
  // Main image is 400px tall.  Below it is gap-3 (12px) then the thumbnail strip.
  // Carousel image top ≈ H*0.05 + 40 (lg:p-10 from top):
  const carouselTop = 40; // lg:p-10 = 40px
  const thumbStripTop = carouselTop + 400 + 12; // below main image + gap-3
  const thumbStripMidY = thumbStripTop + 40; // mid of h-20 (80px) strip

  // The component body centre x:
  const contentCentreX = W / 2;
  // At index=0 the active thumb (120px) sits leftmost, then 35px ones follow.
  // After clicking index 2: the active shifts right ~(35+35+2+2)=74px from left.
  // Use selector approach for reliability:

  const thumbButtons = () => page.locator('.overflow-x-auto button');

  // ── click thumbnail index 2 (3rd image) ──────────────────────────────────
  try {
    const btn = thumbButtons().nth(2);
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
  } catch (_) {}
  await wait(800);

  // ── click thumbnail index 5 (6th image) ──────────────────────────────────
  try {
    const btn = thumbButtons().nth(5);
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
  } catch (_) {}
  await wait(800);

  // ── click thumbnail index 9 (10th image) ─────────────────────────────────
  try {
    const btn = thumbButtons().nth(9);
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
