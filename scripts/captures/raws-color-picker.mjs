/**
 * Capture choreography for raws-color-picker
 *
 * RawsColorPicker is a custom (no react-colorful) inline picker: a large
 * saturation/value color panel on top, a hue rainbow slider below, then a
 * hex input + copy button + eyedropper preview strip.
 *
 * Strategy: drag across the saturation panel (color panel), then drag the
 * hue slider to shift the entire colour. No click needed — the component
 * is fully open on mount.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    // Wait for the canvas to initialise its dimensions
    try { await wait(600); } catch (_) {}

    // Drag across the saturation/value panel (the large gradient area)
    // The panel is .relative.h-48 (192 px) above the hue slider.
    // Pick a start point at ~75% right, 20% down (vivid saturated colour)
    // and drag to ~40% right, 55% down (medium brightness).
    try {
      // The color panel is the first .cursor-crosshair div
      const panel = page.locator('.cursor-crosshair').first();
      const box = await panel.boundingBox();
      if (box) {
        const sx = box.x + box.width * 0.75;
        const sy = box.y + box.height * 0.20;
        const ex = box.x + box.width * 0.40;
        const ey = box.y + box.height * 0.55;
        await page.mouse.move(sx, sy);
        await page.mouse.down();
        await wait(100);
        await page.mouse.move(ex, ey, { steps: 12 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(350); } catch (_) {}

    // Drag the hue slider from ~20% to ~65% (shift toward green/cyan)
    try {
      // Hue slider: .cursor-pointer.touch-none (second div after the panel)
      const hueSlider = page.locator('.cursor-pointer.touch-none').first();
      const box = await hueSlider.boundingBox();
      if (box) {
        const sx = box.x + box.width * 0.20;
        const sy = box.y + box.height * 0.5;
        const ex = box.x + box.width * 0.65;
        await page.mouse.move(sx, sy);
        await page.mouse.down();
        await wait(80);
        await page.mouse.move(ex, sy, { steps: 10 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(350); } catch (_) {}

    // Drag hue back to ~20% for a visible round-trip
    try {
      const hueSlider = page.locator('.cursor-pointer.touch-none').first();
      const box = await hueSlider.boundingBox();
      if (box) {
        const sx = box.x + box.width * 0.65;
        const sy = box.y + box.height * 0.5;
        const ex = box.x + box.width * 0.20;
        await page.mouse.move(sx, sy);
        await page.mouse.down();
        await wait(80);
        await page.mouse.move(ex, sy, { steps: 10 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(300); } catch (_) {}
  } catch (err) {
    console.error('raws-color-picker capture error:', err);
  }
}
