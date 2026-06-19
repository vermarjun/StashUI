/**
 * Choreography: ai-instructions
 * A trigger button opens a command-list popover with toggleable AI instruction presets.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the Instructions trigger button
  try {
    const trigger = page.getByRole("button", { name: /instructions/i }).first()
    const box = await trigger.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(150)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      await page.mouse.click(W / 2, H / 2)
    }
    await wait(700)
  } catch (_) {}

  // 3. Hover over and click a second instruction item to toggle it
  try {
    // Items are cmdk-item elements; click the second one
    const items = page.locator("[cmdk-item]")
    const second = items.nth(1)
    const box = await second.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(400)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
      await wait(500)
    }
  } catch (_) {}

  // 4. Hover over third item
  try {
    const items = page.locator("[cmdk-item]")
    const third = items.nth(2)
    const box = await third.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(400)
    }
  } catch (_) {}

  // 5. Dwell on open state with selections visible
  try { await wait(1200); } catch (_) {}

  // 6. Close via Escape
  try {
    await page.keyboard.press("Escape")
    await wait(500)
  } catch (_) {}
}
