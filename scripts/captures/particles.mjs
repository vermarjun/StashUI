// particles: canvas particles drift and follow the cursor via magnetism.
// Move mouse in slow arcs so particles visibly stream toward the pointer.
export default async function capture(page, { W, H, wait }) {
  // Settle for canvas init and first particle draw (~400 ms)
  try { await wait(400); } catch (_) {}

  // Start at centre so particles spawn with reference point
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(600); } catch (_) {}

  // Slow arc: centre → top-right → bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.25), { steps: 30 });
    await wait(600);
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.75), { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Sweep left across centre
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.5), { steps: 40 });
    await wait(600);
  } catch (_) {}

  // Arc back up to top-left
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.25), { steps: 25 });
    await wait(500);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 25 });
  } catch (_) {}

  try { await wait(500); } catch (_) {}
}
