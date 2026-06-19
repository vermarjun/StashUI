/**
 * Capture choreography for feature-voting
 *
 * Shows a feature-request upvote list. We click several upvote triggers to
 * increment tallies and show the voted (highlighted) state, then cycle back
 * so the loop reads cleanly.
 */
export default async function capture({ page, waitForSelector, sleep }) {
  // Wait for the list to render
  try {
    await waitForSelector('[aria-label="Feature voting list"]', { timeout: 5000 })
  } catch (_) {}

  await sleep(400)

  // Click "Mobile App" upvote button (highest count — most visually impactful)
  try {
    const triggers = await page.$$('[data-slot="feature-voting-trigger"]')
    if (triggers[2]) {
      await triggers[2].click()
      await sleep(500)
    }
  } catch (_) {}

  // Click "Dark Mode" upvote button
  try {
    const triggers = await page.$$('[data-slot="feature-voting-trigger"]')
    if (triggers[0]) {
      await triggers[0].click()
      await sleep(500)
    }
  } catch (_) {}

  // Click "API Integrations" upvote button
  try {
    const triggers = await page.$$('[data-slot="feature-voting-trigger"]')
    if (triggers[1]) {
      await triggers[1].click()
      await sleep(600)
    }
  } catch (_) {}

  // Pause so viewer can read the voted state
  await sleep(800)

  // Unvote all to loop back near start
  try {
    const triggers = await page.$$('[data-slot="feature-voting-trigger"]')
    for (const t of [triggers[2], triggers[0], triggers[1]]) {
      if (t) {
        await t.click()
        await sleep(300)
      }
    }
  } catch (_) {}

  await sleep(400)
}
