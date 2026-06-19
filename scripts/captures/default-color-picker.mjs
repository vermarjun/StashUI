/**
 * Capture choreography for default-color-picker
 *
 * Shares color-picker.demo.tsx with ui-layouts-color-picker.
 * Same component: click the swatch, drag saturation panel, drag hue slider.
 * Demo must NOT be edited for this variant.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    // Let the component hydrate
    try { await wait(500); } catch (_) {}

    // Click the color swatch button to open the popover
    try {
      await page.locator('button.h-8.w-12').first().click();
    } catch (_) {
      try { await page.getByRole('button', { name: /pick a color/i }).click(); } catch (_) {}
    }

    try { await wait(400); } catch (_) {}

    // Drag across the react-colorful saturation panel
    try {
      const panel = page.locator('.react-colorful__saturation').first();
      const box = await panel.boundingBox();
      if (box) {
        const startX = box.x + box.width * 0.80;
        const startY = box.y + box.height * 0.20;
        const endX   = box.x + box.width * 0.50;
        const endY   = box.y + box.height * 0.50;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await wait(100);
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(300); } catch (_) {}

    // Drag hue slider rightward (toward green/cyan range)
    try {
      const hueSlider = page.locator('.react-colorful__hue').first();
      const box = await hueSlider.boundingBox();
      if (box) {
        const startX = box.x + box.width * 0.30;
        const startY = box.y + box.height * 0.5;
        const endX   = box.x + box.width * 0.65;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await wait(80);
        await page.mouse.move(endX, startY, { steps: 8 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(500); } catch (_) {}

    // Drag hue back toward start for a visible round-trip
    try {
      const hueSlider = page.locator('.react-colorful__hue').first();
      const box = await hueSlider.boundingBox();
      if (box) {
        const startX = box.x + box.width * 0.65;
        const startY = box.y + box.height * 0.5;
        const endX   = box.x + box.width * 0.30;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await wait(80);
        await page.mouse.move(endX, startY, { steps: 8 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(300); } catch (_) {}
  } catch (err) {
    console.error('default-color-picker capture error:', err);
  }
}
