/**
 * Choreography: popover
 * A button morphs into a note-writing popover with a textarea.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the "Leave a note" trigger button
  try {
    const trigger = page.getByRole("button", { name: /leave a note/i }).first()
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

  // 3. Type in the textarea
  try {
    const textarea = page.locator("textarea").first()
    const box = await textarea.boundingBox()
    if (box) {
      await page.mouse.click(box.x + 10, box.y + 10)
      await wait(200)
      await page.keyboard.type("Smooth morphing animation!", { delay: 55 })
      await wait(700)
    }
  } catch (_) {}

  // 4. Dwell on the filled popover
  try { await wait(1200); } catch (_) {}

  // 5. Close via Escape
  try {
    await page.keyboard.press("Escape")
    await wait(500)
  } catch (_) {}
}
