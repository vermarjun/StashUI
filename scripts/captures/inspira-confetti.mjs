/**
 * Choreography: inspira-confetti
 * Behavior: A ConfettiButton fires canvas-confetti on click. Click 3–4 times
 *           so multiple bursts overlap in the capture.
 */
export default async function choreography(page, { W, H }) {
  // The button is centred inside min-h-[300px] → roughly at viewport centre.
  const btnX = W / 2;
  const btnY = H / 2 + 30; // slightly below centre (below the label text)

  // Move to button
  try {
    await page.mouse.move(btnX, btnY, { steps: 20 });
    await page.waitForTimeout(300);
  } catch (_) {}

  // Click 1 — initial burst
  try {
    await page.mouse.click(btnX, btnY);
    await page.waitForTimeout(600);
  } catch (_) {}

  // Click 2
  try {
    await page.mouse.click(btnX, btnY);
    await page.waitForTimeout(600);
  } catch (_) {}

  // Click 3
  try {
    await page.mouse.click(btnX, btnY);
    await page.waitForTimeout(600);
  } catch (_) {}

  // Click 4 — final burst; dwell to let confetti settle
  try {
    await page.mouse.click(btnX, btnY);
    await page.waitForTimeout(2000);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 15 });
  } catch (_) {}
}
