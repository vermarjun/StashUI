/**
 * Capture choreography for feature-poll
 *
 * Shows a "what matters most" poll. Options are unvoted at start.
 * We click options to show the selection highlight and indicator fill,
 * demonstrating the selection UX. The footer vote count is always visible.
 * Loop ends by deselecting to return to the initial idle state.
 */
export default async function capture({ page, waitForSelector, sleep }) {
  try {
    await waitForSelector('[data-slot="feature-poll"]', { timeout: 5000 })
  } catch (_) {}

  await sleep(400)

  // Click "Performance"
  try {
    const options = await page.$$('[data-slot="feature-poll-option"]')
    if (options[0]) {
      await options[0].click()
      await sleep(700)
    }
  } catch (_) {}

  // Click "Developer Experience"
  try {
    const options = await page.$$('[data-slot="feature-poll-option"]')
    if (options[1]) {
      await options[1].click()
      await sleep(700)
    }
  } catch (_) {}

  // Click "Ecosystem & Libraries"
  try {
    const options = await page.$$('[data-slot="feature-poll-option"]')
    if (options[2]) {
      await options[2].click()
      await sleep(800)
    }
  } catch (_) {}

  // Deselect to return near start
  try {
    const options = await page.$$('[data-slot="feature-poll-option"]')
    if (options[2]) {
      await options[2].click()
      await sleep(400)
    }
  } catch (_) {}

  await sleep(300)
}
