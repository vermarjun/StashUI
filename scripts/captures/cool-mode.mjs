// cool-mode: coloured particle circles spray out of a button while the mouse
// is held down and moving over it. Click-hold + drag to keep particles flying.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: let the component mount.
  try { await wait(400); } catch (_) {}

  // Locate the button that CoolMode wraps.
  let btn;
  let box;
  try {
    btn = page.locator('button').first();
    await btn.waitFor({ state: 'visible', timeout: 4000 });
    box = await btn.boundingBox();
  } catch (_) {}

  if (!box) {
    box = { x: W * 0.35, y: H * 0.4, width: W * 0.3, height: H * 0.12 };
  }

  const cx = Math.round(box.x + box.width / 2);
  const cy = Math.round(box.y + box.height / 2);

  // Hover to show button.
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(200);
  } catch (_) {}

  // Click-hold and drag left-right so particles spray continuously.
  try {
    await page.mouse.move(cx - Math.round(box.width * 0.35), cy, { steps: 6 });
    await page.mouse.down();

    // Sweep right.
    const steps = 18;
    for (let i = 0; i <= steps; i++) {
      await page.mouse.move(
        cx - Math.round(box.width * 0.35) + Math.round(box.width * 0.7 * (i / steps)),
        cy + Math.round(Math.sin(i / steps * Math.PI) * 8),
        { steps: 1 }
      );
      await wait(30);
    }

    // Sweep back left.
    for (let i = steps; i >= 0; i--) {
      await page.mouse.move(
        cx - Math.round(box.width * 0.35) + Math.round(box.width * 0.7 * (i / steps)),
        cy - Math.round(Math.sin(i / steps * Math.PI) * 8),
        { steps: 1 }
      );
      await wait(30);
    }

    await page.mouse.up();
  } catch (_) {}

  // Dwell to let remaining particles fly off screen.
  try { await wait(800); } catch (_) {}

  // Return mouse to center.
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
