// Vertical slider (embla, axis:'y')
// Interactions: click the down-arrow (SliderNextButton) 3×, then the up-arrow
// (SliderPrevButton) once so we end near the starting slide.
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for images to load and embla to initialise
  await wait(900);

  // SliderNextButton is the absolute-positioned button at the BOTTOM of the carousel
  // (ChevronDown). SliderPrevButton is at the TOP (ChevronUp).
  // The carousel is contained in a max-w-2xl div centred in the viewport.

  // ── advance forward 3 slides ──────────────────────────────────────────────
  for (let i = 0; i < 3; i++) {
    try {
      // The next-button is the last button inside the carousel wrapper that
      // contains a ChevronDown svg (bottom-4 centre).  Locate by position:
      // it sits at roughly (W/2, H*0.75).  Use a selector instead.
      const nextBtn = page.locator('button:has(svg path[d*="19l-7"])').last();
      // fallback: any button near bottom-centre of the carousel
      const box = await nextBtn.boundingBox().catch(() => null);
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      } else {
        // approximate coords: centred horizontally, ~72% down the viewport
        await page.mouse.click(W / 2, H * 0.72);
      }
    } catch (_) {}
    await wait(700);
  }

  // ── step back up once so we end near slide 3 (not the very last) ─────────
  try {
    const prevBtn = page.locator('button:has(svg path[d*="7-7 7"])').first();
    const box = await prevBtn.boundingBox().catch(() => null);
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W / 2, H * 0.18);
    }
  } catch (_) {}
  await wait(700);
}
