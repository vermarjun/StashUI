/**
 * Choreography: linear-modal
 * Click the image card trigger to expand it into a full dialog, dwell, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the dialog trigger card
  try {
    const trigger = page.getByRole('button', { name: /mountain vista/i }).first();
    const box = await trigger.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      // fallback: click center of page
      await page.mouse.click(W / 2, H / 2);
    }
    await wait(900); // spring animation settles
  } catch (_) {}

  // 3. Dwell on open dialog — hover the Download button
  try {
    const dlBtn = page.getByRole('button', { name: /download/i }).first();
    const box = await dlBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(600);
    }
  } catch (_) {}

  // 4. Dwell on open state
  try { await wait(1200); } catch (_) {}

  // 5. Close with Escape
  try {
    await page.keyboard.press('Escape');
    await wait(600);
  } catch (_) {}

  // 6. Return cursor to center
  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
