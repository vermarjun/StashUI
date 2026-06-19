/**
 * Choreography: family-drawer
 * A bottom drawer with multiple animated views (share options).
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the "Share" trigger button
  try {
    const trigger = page.getByRole("button", { name: /share/i }).first()
    const box = await trigger.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(150)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      await page.mouse.click(W / 2, H / 2)
    }
    await wait(800)
  } catch (_) {}

  // 3. Hover over "Copy link" button
  try {
    const copyBtn = page.getByRole("button", { name: /copy link/i }).first()
    const box = await copyBtn.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(400)
    }
  } catch (_) {}

  // 4. Click "Copy link" to navigate to copy view
  try {
    const copyBtn = page.getByRole("button", { name: /copy link/i }).first()
    const box = await copyBtn.boundingBox()
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    }
    await wait(700)
  } catch (_) {}

  // 5. Dwell on copy view
  try { await wait(1000); } catch (_) {}

  // 6. Go back to default view
  try {
    const backBtn = page.getByRole("button", { name: /back/i }).first()
    const box = await backBtn.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(200)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    }
    await wait(700)
  } catch (_) {}

  // 7. Close the drawer by clicking overlay
  try {
    await page.mouse.click(W / 2, H * 0.15)
    await wait(500)
  } catch (_) {}
}
