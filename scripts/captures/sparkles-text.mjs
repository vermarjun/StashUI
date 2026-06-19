// sparkles-text: star sparkles animate around the text continuously via an
// interval that regenerates sparkle positions. Auto-plays — dwell ~3 s so
// multiple sparkle lifecycle waves are visible.
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from the text so no hover states activate.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 5 });
  } catch (_) {}

  // Allow component to mount and sparkle interval to fire at least once.
  try {
    await wait(500);
  } catch (_) {}

  // Dwell ~3 s — spans ~3 full sparkle lifecycle cycles (interval=100 ms,
  // lifespan 5–15 steps means most sparkles regenerate within 1–2 s).
  try {
    await wait(3000);
  } catch (_) {}

  // Return mouse to the same park position for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 3 });
    await wait(200);
  } catch (_) {}
}
