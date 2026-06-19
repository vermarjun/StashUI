// spinning-text: text characters arranged on a circular path, the whole ring
// rotates continuously (motion/react infinite rotate). Auto-plays — just dwell
// so several full rotations are visible. Park mouse away from centre.
export default async function capture(page, { W, H, wait }) {
  // Park cursor well clear of the spinning ring so no hover state interferes.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 5 });
  } catch (_) {}

  // Let the component mount and the first animation frame tick.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell ~3 s — enough for nearly half a rotation at duration=8s.
  try {
    await wait(3000);
  } catch (_) {}

  // Tiny mouse nudge to stay in the same off-centre zone for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 3 });
    await wait(200);
  } catch (_) {}
}
