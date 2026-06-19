/**
 * Choreography: bg-stractium
 * Shader background (Stractium ray-march). Let WebGL settle ~2 s, then dwell.
 */
export default async function choreograph({ page, W, H }) {
  // Move mouse to centre so mouse-reactive shader initialises with a stable position
  try {
    await page.mouse.move(W / 2, H / 2);
  } catch (e) {
    console.warn("mouse.move centre failed", e.message);
  }

  // Settle: shader needs ~2 s to render first frames
  await new Promise((r) => setTimeout(r, 2000));

  // Gentle drift to expose shader response to mouse position
  try {
    await page.mouse.move(W * 0.35, H * 0.4, { steps: 20 });
    await new Promise((r) => setTimeout(r, 500));
    await page.mouse.move(W * 0.65, H * 0.6, { steps: 20 });
    await new Promise((r) => setTimeout(r, 500));
    await page.mouse.move(W / 2, H / 2, { steps: 20 });
  } catch (e) {
    console.warn("drift moves failed", e.message);
  }

  // Dwell at settled state for capture
  await new Promise((r) => setTimeout(r, 3000));
}
