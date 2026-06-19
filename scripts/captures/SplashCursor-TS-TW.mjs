/**
 * Capture script: SplashCursor-TS-TW
 * Choreography: WebGL fluid simulation — settles ~1.5s.
 * Perform a mousedown-drag arc to splash fluid, then move mouse in big arcs
 * without click (mousemove only also creates trails once pointer is moved).
 * May render blank headless — orchestrator falls back to static screenshot.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Allow WebGL fluid sim to initialise
  await page.waitForTimeout(1500);

  // Click-splat at center to seed the simulation
  try {
    await page.mouse.click(W * 0.5, H * 0.5);
    await page.waitForTimeout(200);
  } catch (e) {
    console.warn('SplashCursor: initial click error', e.message);
  }

  // Big arc sweep 1: center → top-right
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 1 });
    await page.mouse.down();
    await page.mouse.move(W * 0.85, H * 0.15, { steps: 55 });
    await page.mouse.up();
    await page.waitForTimeout(200);
  } catch (e) {
    console.warn('SplashCursor: arc 1 error', e.message);
  }

  // Big arc sweep 2: top-right → bottom-left
  try {
    await page.mouse.move(W * 0.85, H * 0.15, { steps: 1 });
    await page.mouse.down();
    await page.mouse.move(W * 0.15, H * 0.85, { steps: 65 });
    await page.mouse.up();
    await page.waitForTimeout(200);
  } catch (e) {
    console.warn('SplashCursor: arc 2 error', e.message);
  }

  // Big arc sweep 3: bottom-left → bottom-right
  try {
    await page.mouse.move(W * 0.15, H * 0.85, { steps: 1 });
    await page.mouse.down();
    await page.mouse.move(W * 0.85, H * 0.85, { steps: 55 });
    await page.mouse.up();
    await page.waitForTimeout(300);
  } catch (e) {
    console.warn('SplashCursor: arc 3 error', e.message);
  }

  // Dwell so fluid dissipates partially and the color splashes are visible
  await page.waitForTimeout(1000);

  // Return near center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 30 });
    await page.waitForTimeout(500);
  } catch (e) {
    console.warn('SplashCursor: return error', e.message);
  }
}
