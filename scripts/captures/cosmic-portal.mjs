// cosmic-portal (inspira-react): Three.js WebGL portal with vortex rings, floating
// crystals, bloom post-processing, and auto-rotating OrbitControls.
// Has two buttons: "Activate Portal" (pulse wave) and "Shift Dimensions" (recolor).
export default async function capture(page, { W, H, wait }) {
  // Settle: Three.js scene init + bloom pass + crystal geometry creation
  await wait(2200);

  // Dwell on the auto-rotating portal scene
  await wait(1500);

  // Click "Activate Portal" to trigger the pulse-wave shader effect
  try {
    const activateBtn = page.getByRole("button", { name: "Activate Portal" });
    await activateBtn.click({ timeout: 3000 });
    await wait(1200); // pulse wave expands for ~1s
  } catch (_) {
    try {
      // Fallback: click by approximate position (button row is below the canvas)
      await page.mouse.click(W * 0.43, H * 0.9);
      await wait(1000);
    } catch (_2) {}
  }

  // Gentle mouse orbit drag across the canvas (OrbitControls)
  try {
    const cx = Math.round(W / 2);
    const cy = Math.round(H * 0.45);
    await page.mouse.move(cx, cy, { steps: 5 });
    await page.mouse.down();
    await page.mouse.move(cx + 80, cy - 30, { steps: 22 });
    await wait(400);
    await page.mouse.move(cx - 40, cy + 20, { steps: 22 });
    await wait(400);
    await page.mouse.up();
  } catch (_) {}

  await wait(800);

  // Click "Shift Dimensions" to randomise portal colors
  try {
    const shiftBtn = page.getByRole("button", { name: "Shift Dimensions" });
    await shiftBtn.click({ timeout: 2000 });
    await wait(1500); // scene rebuilds with new colours
  } catch (_) {
    try {
      await page.mouse.click(W * 0.57, H * 0.9);
      await wait(1200);
    } catch (_2) {}
  }

  // Final dwell on the new colour scheme
  await wait(1000);
}
