export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for images to load in the 3-column parallax grid
  await wait(800);

  // Find the scrollable container (h-[40rem] overflow-y-auto div)
  // The component self-contains scroll, so we wheel inside it
  let cx = W / 2;
  let cy = H / 2;

  try {
    // Move mouse to the grid area so wheel events register inside the container
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}
  await wait(300);

  // Scroll down through the grid in ~6 steps — columns 1 & 3 drift upward
  // (translateFirst/translateThird go to -200px), column 2 drifts down (+200px)
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.55));
    } catch (_) {}
    await wait(450);
  }

  // Pause at the bottom to show full parallax offset
  await wait(500);

  // Scroll back to top so the loop seam is clean
  try {
    await page.evaluate(() => {
      const el = document.querySelector('.overflow-y-auto');
      if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  } catch (_) {}
  await wait(700);
}
