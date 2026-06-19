/**
 * Capture choreography: infinite-moving-cards
 *
 * An auto-scrolling marquee of testimonial cards — the interesting moment is
 * seeing cards continuously slide past. Strategy:
 *   1. Wait for the scroller animation to start (React mounts, clones items, sets `start` state).
 *   2. Dwell ~4 s so ~1/4 of the slow-speed loop plays through in the capture window.
 *   3. Briefly hover to show the pause-on-hover behaviour, then move away.
 *   4. Dwell another ~3.5 s to confirm auto-resume.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the animated scroller list to appear
  try {
    await page.locator("ul.animate-scroll").first().waitFor({
      state: "visible",
      timeout: 8000,
    });
  } catch {
    // fallback — let React hydrate
    await wait(1000);
  }

  // Brief settle
  await wait(500);

  // Dwell to capture cards scrolling left
  await wait(3800);

  // Hover mid-scroller to show pause
  try {
    const scroller = page.locator("ul.animate-scroll").first();
    const box = await scroller.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
  } catch {
    await page.mouse.move(W / 2, H / 2);
  }

  await wait(1200);

  // Move away — scroll resumes
  await page.mouse.move(W / 2, H - 40);

  await wait(3500);
}
