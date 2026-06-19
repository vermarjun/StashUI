// scroll-progress: a fixed 1 px bar at the top scales scaleX 0→1 via
// motion/react useScroll (tracks window scrollYProgress). Show: idle (bar
// empty) → wheel down → bar fills → wheel back up → bar empties.
export default async function capture(page, { W, H, wait }) {
  // Ensure focus is on the page so wheel events register.
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 5 });
    await page.mouse.click(W * 0.5, H * 0.5);
  } catch (_) {}

  // Settle at top — bar should be at scaleX(0).
  try {
    await wait(500);
  } catch (_) {}

  // Scroll down in increments so the bar visibly fills.
  try {
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, 320);
      await wait(180);
    }
  } catch (_) {}

  // Dwell at bottom — bar fully or mostly filled.
  try {
    await wait(700);
  } catch (_) {}

  // Scroll back up — bar shrinks back toward zero.
  try {
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, -320);
      await wait(180);
    }
  } catch (_) {}

  // Final settle at top — loop seam with bar empty.
  try {
    await wait(500);
  } catch (_) {}
}
