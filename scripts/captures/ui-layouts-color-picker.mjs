/**
 * Capture choreography for ui-layouts-color-picker
 *
 * ColorPicker renders a swatch button that opens a Popover containing
 * HexColorPicker (react-colorful). Strategy: click the swatch to open the
 * popover, then drag across the saturation/value panel, then drag the hue
 * slider to pick a different hue.
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

    // Locate the react-colorful saturation panel (.react-colorful__saturation)
    // and drag from near top-right (vivid) toward center
    try {
      const panel = page.locator('.react-colorful__saturation').first();
      const box = await panel.boundingBox();
      if (box) {
        const startX = box.x + box.width * 0.85;
        const startY = box.y + box.height * 0.15;
        const endX   = box.x + box.width * 0.55;
        const endY   = box.y + box.height * 0.45;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await wait(100);
        await page.mouse.move(startX - (startX - endX) * 0.33, startY + (endY - startY) * 0.33, { steps: 5 });
        await wait(80);
        await page.mouse.move(endX, endY, { steps: 5 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(300); } catch (_) {}

    // Drag the hue slider from its current position toward 200° (blue-cyan)
    try {
      const hueSlider = page.locator('.react-colorful__hue').first();
      const box = await hueSlider.boundingBox();
      if (box) {
        const startX = box.x + box.width * 0.25;
        const startY = box.y + box.height * 0.5;
        const endX   = box.x + box.width * 0.58;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await wait(80);
        await page.mouse.move(endX, startY, { steps: 8 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(400); } catch (_) {}

    // Return: drag hue back roughly to start
    try {
      const hueSlider = page.locator('.react-colorful__hue').first();
      const box = await hueSlider.boundingBox();
      if (box) {
        const startX = box.x + box.width * 0.58;
        const startY = box.y + box.height * 0.5;
        const endX   = box.x + box.width * 0.25;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await wait(80);
        await page.mouse.move(endX, startY, { steps: 8 });
        await page.mouse.up();
      }
    } catch (_) {}

    try { await wait(300); } catch (_) {}
  } catch (err) {
    console.error('ui-layouts-color-picker capture error:', err);
  }
}
