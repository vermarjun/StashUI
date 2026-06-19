/**
 * Choreography: popover-form
 * A "Feedback" label-button morphs into a popover with a textarea form.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the "Feedback" trigger to open the popover
  try {
    const trigger = page.locator("button").filter({ hasText: /^feedback$/i }).first()
    const box = await trigger.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(150)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      await page.mouse.click(W / 2, H / 2)
    }
    await wait(600)
  } catch (_) {}

  // 3. Click textarea and type feedback
  try {
    const textarea = page.locator("textarea").first()
    const box = await textarea.boundingBox()
    if (box) {
      await page.mouse.click(box.x + 10, box.y + 10)
      await wait(250)
      await page.keyboard.type("Really like the morph effect!", { delay: 55 })
      await wait(700)
    }
  } catch (_) {}

  // 4. Dwell on the filled state
  try { await wait(1200); } catch (_) {}

  // 5. Close by clicking outside
  try {
    await page.mouse.click(W / 2, H * 0.1)
    await wait(500)
  } catch (_) {}
}
