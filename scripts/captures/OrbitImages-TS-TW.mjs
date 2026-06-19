/**
 * Choreography: OrbitImages-TS-TW
 * Behavior: 6 images orbit along an elliptical path (CSS offset-path) at a
 *   constant speed (duration=18s). Fully autonomous – no cursor interaction.
 * Strategy: let it settle ~1s for image loads and motion to start, dwell ~3s
 *   to capture images spread around the ellipse, take a few screenshots.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    // 1. Let images load and orbit animation initialize
    await page.waitForTimeout(1000);
    await screenshot('orbit-init');

    // 2. Dwell to allow images to visibly spread around the ellipse
    await page.waitForTimeout(1500);
    await screenshot('orbit-spread');

    // 3. Continue dwelling – capture ~1/3 orbit progress
    await page.waitForTimeout(1500);
    await screenshot('orbit-third');

    // 4. Hover near center (no effect, just keeps mouse in frame)
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(300);
  } catch (err) {
    console.warn('[OrbitImages choreograph]', err?.message ?? err);
  }
}
