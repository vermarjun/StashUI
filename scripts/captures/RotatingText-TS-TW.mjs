/**
 * Choreography: RotatingText-TS-TW
 * Behavior: the rotating word cycles every 2000ms automatically. Dwell long
 * enough to show two full rotations (4 words visible), then settle.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);

  // Allow mount and first render
  try {
    await wait(400);
  } catch (_) {}

  // Keep mouse out of the text area
  try {
    await page.mouse.move(cx, Math.round(H * 0.88));
  } catch (_) {}

  // Watch two full rotation cycles (4 words × 2000ms each = 8s, trimmed to
  // show 3.5s which captures at least 2 word changes clearly)
  try {
    await wait(3500);
  } catch (_) {}

  // Return mouse near start for a clean loop
  try {
    await page.mouse.move(cx, Math.round(H * 0.88));
    await wait(200);
  } catch (_) {}
}
