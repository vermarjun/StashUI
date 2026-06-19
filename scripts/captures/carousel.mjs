/**
 * Capture choreography: carousel (aceternity-ui)
 *
 * A 3-D perspective slide carousel. Each `CarouselControl` renders a round
 * button with `title="Go to next slide"` (type=next) or
 * `title="Go to previous slide"` (type=previous). Clicking next advances the
 * `current` index and the track translates left with a 1 s ease-in-out.
 *
 * Strategy:
 *   1. Wait for slides/images to render.
 *   2. Dwell on slide 0 to show the active 3-D tilt effect.
 *   3. Click "Go to next slide" 3 × with ~1.4 s dwell each (1 s transition + buffer).
 *   4. Click "Go to previous slide" once to show reverse, then dwell.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the slide list to be visible
  try {
    await page.locator("ul").first().waitFor({
      state: "visible",
      timeout: 8000,
    });
  } catch {
    await wait(1000);
  }

  // Let images load and initial render settle
  await wait(1200);

  // Hover the active slide to show the parallax mouse-tracking effect
  try {
    const slide = page.locator("li").first();
    const box = await slide.boundingBox();
    if (box) {
      await page.mouse.move(
        box.x + box.width * 0.6,
        box.y + box.height * 0.4
      );
    }
  } catch {
    // ignore
  }

  await wait(800);

  // Locate the "next slide" button
  const nextBtn = page.getByTitle("Go to next slide");
  const prevBtn = page.getByTitle("Go to previous slide");

  // Click next 3 times
  for (let i = 0; i < 3; i++) {
    try {
      await nextBtn.click();
    } catch {
      // fallback: click right of centre near bottom
      await page.mouse.click(W * 0.55, H * 0.88);
    }
    await wait(1400);
  }

  // Click previous once to show bidirectional nav
  try {
    await prevBtn.click();
  } catch {
    await page.mouse.click(W * 0.45, H * 0.88);
  }

  await wait(1400);
}
