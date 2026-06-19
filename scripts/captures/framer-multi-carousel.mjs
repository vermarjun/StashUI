// Framer multi-slide carousel – at 1200px desktop, breakpoint 1024 shows 3
// slides at a time.  Click next 3× to advance through the deck, then prev once.
// Nav buttons are `absolute right-4 / left-4 top-1/2` inside the overflow div.
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for breakpoint logic and images
  await wait(900);

  // Carousel image container: lg:p-10 (40px) padding all around.
  // Images are h-[300px].  Container top ≈ 40px.
  const carouselTop = 40;
  const carouselMidY = carouselTop + 150; // mid of 300px
  const nextX = W - 40 - 20; // right-4 (16px) + half of w-10 (20px)
  const prevX = 40 + 20;

  // ── click next 3× ─────────────────────────────────────────────────────────
  for (let i = 0; i < 3; i++) {
    try {
      await page.mouse.click(nextX, carouselMidY);
    } catch (_) {}
    await wait(750);
  }

  // ── click prev once ───────────────────────────────────────────────────────
  try {
    await page.mouse.click(prevX, carouselMidY);
  } catch (_) {}
  await wait(700);
}
