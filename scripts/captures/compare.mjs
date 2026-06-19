/**
 * Capture choreography for compare
 *
 * The Compare component is in slideMode="hover" by default in the demo —
 * moving the mouse horizontally across the container updates the clip-path
 * slice in real time, revealing the second image. The handlebar follows the
 * cursor. No click/drag needed.
 *
 * Strategy:
 *   1. Settle so both images load (~800 ms).
 *   2. Move mouse to the left quarter of the component to show mostly the
 *      first image.
 *   3. Sweep right across to show the second image progressively.
 *   4. Pause at right-quarter so the comparison is obvious.
 *   5. Sweep back to left for the loop seam.
 *   6. End near centre (≈ initial 50 % state).
 */
export default async function capture(page, { W, H, wait }) {
  // Let images load
  try {
    await wait(800);
  } catch (_) {}

  // Locate the compare container — it has overflow-hidden and a known width/height
  // The demo centres it; we work in viewport coords by resolving its bounding box.
  let containerBox = null;
  try {
    const el = page.locator('[class*="rounded-2xl"][class*="overflow-hidden"]').first();
    containerBox = await el.boundingBox();
  } catch (_) {}

  // Fallback coords if locator fails: assume centred 600×400 widget
  const cx = containerBox ? containerBox.x + containerBox.width / 2 : W / 2;
  const cy = containerBox ? containerBox.y + containerBox.height / 2 : H / 2;
  const halfW = containerBox ? containerBox.width / 2 : 300;

  // Move to left quarter (mostly first image)
  try {
    await page.mouse.move(cx - halfW * 0.65, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}

  // Sweep right to reveal second image
  try {
    await page.mouse.move(cx + halfW * 0.65, cy, { steps: 18 });
    await wait(600);
  } catch (_) {}

  // Pause at right — second image dominant
  try {
    await wait(400);
  } catch (_) {}

  // Sweep left again — first image returns
  try {
    await page.mouse.move(cx - halfW * 0.5, cy, { steps: 18 });
    await wait(500);
  } catch (_) {}

  // End at centre — matches initialSliderPercentage=50, clean seam
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
