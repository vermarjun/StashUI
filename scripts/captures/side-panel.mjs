/**
 * Choreography: side-panel
 * Shows a dark side panel that expands from the left edge with nav items.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the menu toggle button to open the panel
  try {
    const btn = page.getByRole("button", { name: /open menu/i }).first()
    const box = await btn.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(150)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      await page.mouse.click(W * 0.04, H * 0.04)
    }
    await wait(800)
  } catch (_) {}

  // 3. Hover first nav item
  try {
    const items = page.locator("nav > div")
    const first = items.nth(0)
    const b = await first.boundingBox()
    if (b) {
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 8 })
      await wait(400)
    }
  } catch (_) {}

  // 4. Hover second nav item
  try {
    const items = page.locator("nav > div")
    const second = items.nth(1)
    const b = await second.boundingBox()
    if (b) {
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 8 })
      await wait(400)
    }
  } catch (_) {}

  // 5. Dwell on expanded state
  try { await wait(1000); } catch (_) {}

  // 6. Close the panel
  try {
    const btn = page.getByRole("button", { name: /close/i }).first()
    const box = await btn.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(150)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      await page.mouse.click(W * 0.04, H * 0.04)
    }
    await wait(500)
  } catch (_) {}
}
