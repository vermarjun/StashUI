export default async function capture(page, { W, H, cfg, wait }) {
  // Magnetic button: the inner button follows the cursor when the mouse is
  // nearby. The dashed blue border + tinted bg appear on entry.
  // Choreography: slowly orbit the cursor in a wide ellipse around the button
  // so the viewer sees the button "chase" the mouse, then pull back to centre.

  const cx = W / 2;
  const cy = H / 2;

  // Radii of the orbit — wide enough to trigger magnetic pull but stay on screen.
  const rx = 90;
  const ry = 60;
  const steps = 60; // points per orbit — slow, smooth movement

  // 1. Brief initial dwell before movement starts.
  try {
    await wait(600);
  } catch (_) {}

  // 2. First orbit (full 360°) — slow approach so spring physics are visible.
  for (let i = 0; i <= steps; i++) {
    try {
      const angle = (2 * Math.PI * i) / steps;
      const mx = cx + rx * Math.cos(angle);
      const my = cy + ry * Math.sin(angle);
      await page.mouse.move(mx, my);
      await wait(30);
    } catch (_) {}
  }

  // 3. Spiral inward to hover directly over the button centre.
  for (let i = 0; i <= 20; i++) {
    try {
      const angle = (Math.PI * i) / 20;
      const scale = 1 - i / 20;
      const mx = cx + rx * scale * Math.cos(angle);
      const my = cy + ry * scale * Math.sin(angle);
      await page.mouse.move(mx, my);
      await wait(25);
    } catch (_) {}
  }

  // 4. Dwell at centre — button returns to rest position.
  try {
    await page.mouse.move(cx, cy);
    await wait(800);
  } catch (_) {}

  // 5. Second partial orbit (180°) for a shorter second loop beat.
  for (let i = 0; i <= steps / 2; i++) {
    try {
      const angle = (2 * Math.PI * i) / steps;
      const mx = cx + rx * Math.cos(angle);
      const my = cy + ry * Math.sin(angle);
      await page.mouse.move(mx, my);
      await wait(30);
    } catch (_) {}
  }

  // 6. Pull away — mouse leaves the area so dashed border fades.
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 20 });
    await wait(700);
  } catch (_) {}

  // 7. Return to centre for loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(400);
  } catch (_) {}
}
