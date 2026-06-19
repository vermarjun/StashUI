export default async function capture(page, { W, H, cfg, wait }) {
  // The component triggers staggered blur-in animations when the container
  // enters the viewport. Scroll gently so the container is fully in view,
  // then watch all six items animate in sequentially.
  await wait(400);

  // Nudge the page so the demo container is in view and triggers useInView
  try {
    await page.mouse.wheel(0, 80);
  } catch (_) {}
  await wait(300);

  // Wait for the full stagger chain: 6 items × 0.5s delay + 0.5s duration ≈ 3.5s
  await wait(3500);

  // Brief pause at fully-revealed state
  await wait(500);

  // Scroll back to reset for loop
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  } catch (_) {}
  await wait(500);
}
