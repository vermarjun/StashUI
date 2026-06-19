/**
 * Capture choreography for choice-poll
 *
 * The demo starts with no selection and no results visible.
 * We click an option to highlight it (selection ring + indicator fill),
 * hold so the viewer sees the selected state, then move to another option
 * before looping back to idle. Because hasVoted is uncontrolled in the demo
 * the progress bars only animate once hasVoted is true — the visible star
 * moment here is the selection indicator and border highlight on each option.
 */
export default async function capture({ page, waitForSelector, sleep }) {
  try {
    await waitForSelector('[data-slot="choice-poll"]', { timeout: 5000 })
  } catch (_) {}

  await sleep(400)

  // Click "React"
  try {
    const options = await page.$$('[data-slot="choice-poll-option"]')
    if (options[0]) {
      await options[0].click()
      await sleep(700)
    }
  } catch (_) {}

  // Click "Svelte"
  try {
    const options = await page.$$('[data-slot="choice-poll-option"]')
    if (options[3]) {
      await options[3].click()
      await sleep(700)
    }
  } catch (_) {}

  // Click "Vue"
  try {
    const options = await page.$$('[data-slot="choice-poll-option"]')
    if (options[1]) {
      await options[1].click()
      await sleep(800)
    }
  } catch (_) {}

  // Deselect (click same option again) to return near start
  try {
    const options = await page.$$('[data-slot="choice-poll-option"]')
    if (options[1]) {
      await options[1].click()
      await sleep(400)
    }
  } catch (_) {}

  await sleep(300)
}
