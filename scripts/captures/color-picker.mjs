/**
 * Capture choreography for: color-picker (Cult UI)
 * Behaviour: Clicking the trigger button opens a Radix Popover with a
 * saturation/lightness gradient canvas, a hue range slider, a hex text input,
 * and 12 colour preset swatches.
 * Choreography: rest → click trigger to open popover → click a preset swatch
 * → drag in the saturation canvas → drag the hue slider → dwell → click a
 * different preset → rest (popover stays open for the full capture).
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(500);

  // --- Open the colour picker popover ---
  try {
    const trigger = page.getByRole('button').filter({ hasText: /^#|hsl/i }).first();
    await trigger.click({ timeout: 3000 });
    await wait(500); // popover open animation
  } catch (err) {
    // Fallback: click the first button on the page
    try {
      await page.locator('button').first().click({ timeout: 2000 });
      await wait(500);
    } catch (e) {
      console.error('[color-picker] open error:', e.message);
    }
  }

  // --- Click a colourful preset swatch (index 0 = red #FF3B30) ---
  try {
    // Preset swatches are motion.button elements inside the grid
    const presets = page.locator('[data-radix-popper-content-wrapper] button, [role="dialog"] button');
    // The first several buttons are presets (after the trigger)
    // Use bounding-box approach: find buttons inside the popover content
    const popoverContent = page.locator('[data-radix-popper-content-wrapper]').first();
    const swatches = popoverContent.locator('button');
    const count = await swatches.count();
    if (count > 0) {
      // Click the 4th swatch (green #4CD964) for a visible change
      const targetIdx = Math.min(3, count - 1);
      await swatches.nth(targetIdx).click({ timeout: 2000 });
      await wait(500);
    }
  } catch (err) {
    console.error('[color-picker] preset click error:', err.message);
  }

  // --- Drag within the saturation/lightness gradient canvas ---
  try {
    const popoverContent = page.locator('[data-radix-popper-content-wrapper]').first();
    // The gradient area is a div with cursor-crosshair and h-40
    const canvas = popoverContent.locator('.cursor-crosshair').first();
    const box = await canvas.boundingBox({ timeout: 2000 });
    if (box) {
      // Click near top-right (high saturation, high lightness)
      const startX = box.x + box.width * 0.75;
      const startY = box.y + box.height * 0.2;
      await page.mouse.click(startX, startY);
      await wait(300);
      // Click near middle for a mid-saturation mid-lightness
      await page.mouse.click(box.x + box.width * 0.55, box.y + box.height * 0.5);
      await wait(400);
      // Drag from current position toward bottom-left (desaturate)
      await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5);
      await page.mouse.down();
      await wait(80);
      for (let i = 1; i <= 10; i++) {
        await page.mouse.move(
          box.x + box.width * (0.55 - 0.3 * (i / 10)),
          box.y + box.height * (0.5 + 0.25 * (i / 10)),
          { steps: 1 }
        );
        await wait(30);
      }
      await page.mouse.up();
      await wait(500);
    }
  } catch (err) {
    console.error('[color-picker] canvas drag error:', err.message);
    try { await page.mouse.up(); } catch { /* ignore */ }
  }

  // --- Drag the hue range slider ---
  try {
    const popoverContent = page.locator('[data-radix-popper-content-wrapper]').first();
    const slider = popoverContent.locator('input[type="range"]').first();
    const sbox = await slider.boundingBox({ timeout: 2000 });
    if (sbox) {
      const sx = sbox.x + sbox.width * 0.2;
      const sy = sbox.y + sbox.height / 2;
      await page.mouse.move(sx, sy, { steps: 6 });
      await page.mouse.down();
      await wait(80);
      // Drag rightward to sweep through hues
      for (let i = 1; i <= 12; i++) {
        await page.mouse.move(
          sbox.x + sbox.width * (0.2 + 0.6 * (i / 12)),
          sy,
          { steps: 1 }
        );
        await wait(35);
      }
      await page.mouse.up();
      await wait(500);
    }
  } catch (err) {
    console.error('[color-picker] hue slider error:', err.message);
    try { await page.mouse.up(); } catch { /* ignore */ }
  }

  // --- Click another preset to end on a clean recognisable colour ---
  try {
    const popoverContent = page.locator('[data-radix-popper-content-wrapper]').first();
    const swatches = popoverContent.locator('button');
    const count = await swatches.count();
    if (count > 5) {
      await swatches.nth(5).click({ timeout: 2000 }); // #007AFF blue
      await wait(500);
    }
  } catch (err) {
    console.error('[color-picker] second preset error:', err.message);
  }

  // --- Dwell to let viewer appreciate the live colour swatch ---
  await wait(700);

  // --- Park mouse at neutral (popover will remain open for the loop) ---
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
  } catch { /* ignore */ }
  await wait(300);
}
