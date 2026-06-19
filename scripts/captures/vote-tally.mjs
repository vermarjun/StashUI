/**
 * Capture choreography for vote-tally
 *
 * Community-requests upvote list. We click upvote triggers to increment
 * counts and show the voted (primary-filled) button state, then unvote
 * to loop back cleanly near the starting counts.
 */
export default async function capture({ page, waitForSelector, sleep }) {
  try {
    await waitForSelector('[aria-label="Vote tally list"]', { timeout: 5000 })
  } catch (_) {}

  await sleep(400)

  // Upvote "TypeScript Support" (highest count, index 0)
  try {
    const triggers = await page.$$('[data-slot="vote-tally-trigger"]')
    if (triggers[0]) {
      await triggers[0].click()
      await sleep(500)
    }
  } catch (_) {}

  // Upvote "Better Documentation" (index 2)
  try {
    const triggers = await page.$$('[data-slot="vote-tally-trigger"]')
    if (triggers[2]) {
      await triggers[2].click()
      await sleep(500)
    }
  } catch (_) {}

  // Upvote "Automated Testing" (index 1)
  try {
    const triggers = await page.$$('[data-slot="vote-tally-trigger"]')
    if (triggers[1]) {
      await triggers[1].click()
      await sleep(600)
    }
  } catch (_) {}

  // Pause so viewer sees three voted items highlighted
  await sleep(800)

  // Unvote all in reverse order to loop back near start
  try {
    const triggers = await page.$$('[data-slot="vote-tally-trigger"]')
    for (const idx of [1, 2, 0]) {
      if (triggers[idx]) {
        await triggers[idx].click()
        await sleep(300)
      }
    }
  } catch (_) {}

  await sleep(400)
}
