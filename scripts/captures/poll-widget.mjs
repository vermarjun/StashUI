/**
 * Capture choreography for poll-widget
 *
 * Full inline poll with animated motion bars. The star moment is:
 * 1. Click an option (indicator fills, border highlights)
 * 2. Click "Submit Vote" → voting spinner → bars animate in → success screen
 *
 * autoCollapseDelay=0 keeps the results visible so the bars stay on screen.
 * The capture ends after results are shown; the video loops at that state.
 */
export default async function capture({ page, waitForSelector, sleep }) {
  try {
    await waitForSelector('[data-slot="poll-widget"]', { timeout: 5000 })
  } catch (_) {}

  await sleep(500)

  // Click "AI-assisted coding" option (index 2) — visually interesting choice
  try {
    const options = await page.$$('[data-slot="poll-widget-option"]')
    if (options[2]) {
      await options[2].click()
      await sleep(600)
    }
  } catch (_) {}

  // Click "Submit Vote"
  try {
    const submit = await page.$('[data-slot="poll-widget-submit"]')
    if (submit) {
      await submit.click()
      // Wait through the voting animation sequence (400 ms voting + bars appear)
      await sleep(1200)
    }
  } catch (_) {}

  // Results with animated bars are now visible; hold for viewer
  await sleep(1000)

  // No unvote possible after submit — video loop naturally restarts at results view
}
