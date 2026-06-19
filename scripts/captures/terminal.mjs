export default async function capture(page, { W, H, cfg, wait }) {
  // The aceternity-ui Terminal auto-types commands on mount when the container
  // enters the viewport. Default props include 3 commands with outputs.
  // Strategy: dwell long enough for the full typing sequence to complete,
  // then end near the start state for a clean loop.

  // Initial settle — IntersectionObserver fires immediately at page load
  await wait(500);

  // Dwell while the terminal types its command sequence:
  // ~3 commands × (avg 15 chars × 65ms typing + 800ms pause + ~500ms output) ≈ ~5s
  try {
    await wait(5500);
  } catch (_) {}

  // Brief pause showing the completed terminal output
  await wait(800);

  // Scroll back to top to reset IntersectionObserver for loop
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  } catch (_) {}

  await wait(300);
}
