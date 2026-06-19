// cosmic-button: auto-animating conic gradient border spins continuously.
// Hover to expand the border glow, dwell, then move away for clean loop seam.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — let cosmic spin animation establish itself
  await wait(800);

  // Move toward the button slowly
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 18 });
  } catch (_) {}

  // Hover dwell — border expands outward on hover
  await wait(2200);

  // Move away to resting state
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 14 });
  } catch (_) {}

  // Resting dwell so loop seam is on the idle spinning state
  await wait(800);
}
