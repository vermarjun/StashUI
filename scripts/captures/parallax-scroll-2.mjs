export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for images and motion spring to settle
  await wait(800);

  let cx = W / 2;
  let cy = H / 2;

  try {
    // Hover center so wheel events land inside the overflow-y-auto container
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}
  await wait(300);

  // Scroll down in 6 steps — outer columns rotate+translate (rotateZ ±20deg,
  // translate ±200px) while the center column stays fixed, creating a
  // fan/spread effect unique to parallax-scroll-2
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.55));
    } catch (_) {}
    await wait(450);
  }

  // Hold at bottom — columns are fully rotated and translated apart
  await wait(500);

  // Smooth-scroll back to top so the loop seam is clean
  try {
    await page.evaluate(() => {
      const el = document.querySelector('.overflow-y-auto');
      if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  } catch (_) {}
  await wait(700);
}
