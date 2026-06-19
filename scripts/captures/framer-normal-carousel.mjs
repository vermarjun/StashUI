// Framer normal carousel – click the right-arrow (next) button 3×, then left
// once so we end near the middle.  The carousel fills W with padding (lg:p-10).
export default async function capture(page, { W, H, cfg, wait }) {
  // Let images load and the spring animation settle on first render
  await wait(900);

  // The carousel image area is centred.  At desktop width (lg:p-10 = 40px pad)
  // the actual carousel box runs from x≈40 to x≈W-40 and is ~400px tall.
  // The Next button is `absolute right-4 top-1/2` inside the image container.
  // Estimate the carousel top: padding top is lg:p-10 (40px) + flex-col gap-3.
  // Rough estimate: carousel image block starts at y≈H*0.15, height 400px.
  const carouselTop = H * 0.12;
  const carouselMidY = carouselTop + 200; // mid of 400px image
  const nextX = W - 40 - 20; // right-4 (16px) + half button width (20px)

  // ── click next 3× ─────────────────────────────────────────────────────────
  for (let i = 0; i < 3; i++) {
    try {
      // Try selector first
      const nextBtn = page.locator('button').filter({ hasText: '' }).nth(1);
      // Use coordinate approach: right edge minus margin
      await page.mouse.click(nextX, carouselMidY);
    } catch (_) {}
    await wait(700);
  }

  // ── click prev once ───────────────────────────────────────────────────────
  try {
    const prevX = 40 + 20; // left-4 + half button width
    await page.mouse.click(prevX, carouselMidY);
  } catch (_) {}
  await wait(700);
}
