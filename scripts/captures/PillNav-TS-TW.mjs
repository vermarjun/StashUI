/**
 * Choreography: PillNav-TS-TW
 *
 * NAVBAR type (top-aligned). Hover each pill item to trigger the rising
 * circle + label swap animation, then move back to start.
 * PillNav sits in the top-left (absolute, top 1em).
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount + load animation settle
  try { await wait(900); } catch (_) {}

  // 2. Hover logo first
  try {
    const logo = page.locator('a[aria-label="Home"]').first();
    const box = await logo.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(400);
    }
  } catch (_) {}

  // 3. Hover pill items one by one
  const pillCount = 5;
  for (let i = 0; i < pillCount; i++) {
    try {
      const pills = page.locator('li[role="none"] a[role="menuitem"]');
      const pill = pills.nth(i);
      const b = await pill.boundingBox();
      if (b) {
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 10 });
        await wait(450);
      }
    } catch (_) {}
  }

  // 4. Move back to logo (end near start)
  try {
    const logo = page.locator('a[aria-label="Home"]').first();
    const box = await logo.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
      await wait(400);
    }
  } catch (_) {}
}
