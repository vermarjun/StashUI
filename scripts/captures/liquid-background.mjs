/**
 * Choreography: liquid-background
 * WebGL via OGL (dynamically imported). Canvas is appended on mount.
 * Settle ~2 s for dynamic import + WebGL init, then drift mouse slowly
 * across the surface to show the liquid color field moving, then dwell.
 */
export default async function choreograph({ page, W, H }) {
  // Settle: dynamic import of `ogl` + WebGL context setup
  await new Promise((r) => setTimeout(r, 2000));

  // Slow diagonal drift to showcase liquid colour movement
  try {
    await page.mouse.move(W * 0.2, H * 0.3);
    await new Promise((r) => setTimeout(r, 200));
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 40 });
    await new Promise((r) => setTimeout(r, 600));
    await page.mouse.move(W * 0.75, H * 0.65, { steps: 30 });
    await new Promise((r) => setTimeout(r, 600));
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 30 });
  } catch (e) {
    console.warn("drift failed", e.message);
  }

  // Dwell at centre with liquid settled
  await new Promise((r) => setTimeout(r, 3000));
}
