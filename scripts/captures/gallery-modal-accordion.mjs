/**
 * Choreography: gallery-modal-accordion
 * Hovers through the accordion image strip to expand items, then clicks one to open modal.
 *
 * NOTE: The component uses next/image in the opened modal (AccordionModal → Image from 'next/image').
 * The modal image may not render in headless capture outside Next.js full server context,
 * but the gallery accordion strip itself should render fine.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle — images load
  try { await wait(1000); } catch (_) {}

  // 2. Hover across the accordion strip left-to-right
  try {
    const imgs = page.locator('img[class*="rounded-2xl"]');
    const count = await imgs.count();
    const hoverCount = Math.min(count, 6);
    for (let i = 0; i < hoverCount; i++) {
      const box = await imgs.nth(i).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
        await wait(300);
      }
    }
  } catch (_) {}

  // 3. Click the 3rd image (index 2) to open the modal
  try {
    const imgs = page.locator('img[class*="rounded-2xl"]');
    const count = await imgs.count();
    const targetIdx = Math.min(2, count - 1);
    if (targetIdx >= 0) {
      const box = await imgs.nth(targetIdx).boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      }
    }
    await wait(800);
  } catch (_) {}

  // 4. Dwell on open modal overlay
  try { await wait(1800); } catch (_) {}

  // 5. Close with Escape
  try {
    await page.keyboard.press('Escape');
    await wait(700);
  } catch (_) {}

  // 6. Hover back to center
  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
