// confetti: canvas-confetti bursts from a button click or from the canvas.
// Click the button several times with short pauses so multiple bursts play.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle after mount (Confetti auto-fires once on mount without manualstart).
  try { await wait(600); } catch (_) {}

  // Try to find a button to click (ConfettiButton renders a <button>).
  let btn;
  try {
    btn = page.locator('button').first();
    await btn.waitFor({ state: 'visible', timeout: 3000 });
  } catch (_) {}

  // First burst — click button if found, else click canvas center.
  try {
    if (btn) {
      await btn.click();
    } else {
      await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.5));
    }
    await wait(700);
  } catch (_) {}

  // Second burst — offset click for variety.
  try {
    if (btn) {
      await btn.click();
    } else {
      await page.mouse.click(Math.round(W * 0.4), Math.round(H * 0.5));
    }
    await wait(600);
  } catch (_) {}

  // Third burst.
  try {
    if (btn) {
      await btn.click();
    } else {
      await page.mouse.click(Math.round(W * 0.6), Math.round(H * 0.5));
    }
    await wait(600);
  } catch (_) {}

  // Let confetti particles rain down and settle.
  try { await wait(1500); } catch (_) {}
}
