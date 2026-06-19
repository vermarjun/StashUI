// globe (inspira-react): COBE WebGL globe that auto-rotates.
// Settle ~2s for the canvas to fade in and WebGL to initialise,
// then dwell while it spins. Optionally drag to tilt and release.
export default async function capture(page, { W, H, wait }) {
  // Wait for the canvas to become visible (opacity transition is 1s)
  await wait(2200);

  // Dwell a moment on the auto-rotating globe
  await wait(1000);

  // Gentle drag to tilt the globe slightly left then back
  try {
    const cx = Math.round(W / 2);
    const cy = Math.round(H / 2);

    // Press and drag right to rotate eastward
    await page.mouse.move(cx, cy, { steps: 5 });
    await page.mouse.down();
    await page.mouse.move(cx + 60, cy, { steps: 18 });
    await wait(400);
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(400);
    await page.mouse.up();
  } catch (_) {}

  // Let the spring damping settle and the globe keep spinning
  await wait(1200);
}
