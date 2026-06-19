/**
 * Choreography: bg-thunderstorm
 * Thunderstorm canvas shader. Settle ~2 s (lightning needs frames to build),
 * then dwell so a lightning flash is likely captured.
 */
export default async function choreograph({ page, W, H }) {
  // Centre mouse so mouse-sensitivity initialises neutrally
  try {
    await page.mouse.move(W / 2, H / 2);
  } catch (e) {
    console.warn("mouse.move centre failed", e.message);
  }

  // Settle: allow cloud/lightning layers to render
  await new Promise((r) => setTimeout(r, 2000));

  // Slight upward drift — storm clouds concentrate near top
  try {
    await page.mouse.move(W * 0.5, H * 0.25, { steps: 15 });
    await new Promise((r) => setTimeout(r, 800));
    await page.mouse.move(W * 0.5, H / 2, { steps: 15 });
  } catch (e) {
    console.warn("drift failed", e.message);
  }

  // Dwell — capture mid-animation with potential lightning bolt visible
  await new Promise((r) => setTimeout(r, 3000));
}
