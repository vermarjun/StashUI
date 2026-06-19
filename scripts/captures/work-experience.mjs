export default async function capture(page, { W, H, cfg, wait }) {
  // Let entry animations (staggered opacity + x slide-in for all 3 cards) settle
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(900)
  } catch (_) {}

  // Hover the first card (OpenAI) to trigger the y:-4 lift animation
  try {
    await page.mouse.move(W * 0.5, H * 0.28)
  } catch (_) {}
  await wait(500)

  // Dwell — let the hovered state read clearly in the video frame
  await wait(600)

  // Move to the second card (Stripe) to show the hover lift
  try {
    await page.mouse.move(W * 0.5, H * 0.52)
  } catch (_) {}
  await wait(500)

  // Move away from cards to show them at rest, then dwell on the stats footer
  try {
    await page.mouse.move(W * 0.5, H * 0.88)
  } catch (_) {}
  await wait(700)

  // Return hover to the first card for a clean loop transition
  try {
    await page.mouse.move(W * 0.5, H * 0.28)
  } catch (_) {}
  await wait(500)
}
