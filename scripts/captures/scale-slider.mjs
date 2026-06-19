/**
 * Choreography: scale-slider
 *
 * Component: ScaleSlider — Embla carousel with isScale=true. Each slide's inner
 * .slider_content div is tweened to scale() based on scroll distance from centre.
 * 4 coloured slides (blue, green, yellow, red), w-[55%] wide so adjacent slides
 * peek in, loop:true. Prev/Next chevron buttons at left-4 / right-4.
 *
 * Strategy: click Next 3 times (1→2→3→4) then Prev once (4→3) to show the
 * scale-in transition on each advance. Pauses between clicks to let the tween
 * settle at full scale for the centred slide.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount and Embla init.
  try {
    await wait(900);
  } catch (_) {}

  // Next button: absolute right-4, top-[50%], ChevronRight. Approx right edge.
  async function clickNext() {
    try {
      const btns = page.locator('button[type="button"]:not([disabled])');
      const count = await btns.count();
      if (count >= 2) {
        const box = await btns.last().boundingBox();
        if (box) {
          const cx = Math.round(box.x + box.width / 2);
          const cy = Math.round(box.y + box.height / 2);
          await page.mouse.move(cx, cy, { steps: 6 });
          await wait(80);
          await page.mouse.click(cx, cy);
          return;
        }
      }
    } catch (_) {}
    const cx = Math.round(W * 0.93);
    const cy = Math.round(H * 0.47);
    await page.mouse.move(cx, cy, { steps: 6 });
    await wait(80);
    try { await page.mouse.click(cx, cy); } catch (_) {}
  }

  async function clickPrev() {
    try {
      const btns = page.locator('button[type="button"]:not([disabled])');
      const count = await btns.count();
      if (count >= 2) {
        const box = await btns.first().boundingBox();
        if (box) {
          const cx = Math.round(box.x + box.width / 2);
          const cy = Math.round(box.y + box.height / 2);
          await page.mouse.move(cx, cy, { steps: 6 });
          await wait(80);
          await page.mouse.click(cx, cy);
          return;
        }
      }
    } catch (_) {}
    const cx = Math.round(W * 0.07);
    const cy = Math.round(H * 0.47);
    await page.mouse.move(cx, cy, { steps: 6 });
    await wait(80);
    try { await page.mouse.click(cx, cy); } catch (_) {}
  }

  // 1 → 2: scale-in transition on blue slide.
  try {
    await clickNext();
    await wait(800);
  } catch (_) {}

  // 2 → 3: green slide scales to full.
  try {
    await clickNext();
    await wait(800);
  } catch (_) {}

  // 3 → 4: yellow slide scales in.
  try {
    await clickNext();
    await wait(800);
  } catch (_) {}

  // 4 → 3: back one step to close loop near start.
  try {
    await clickPrev();
    await wait(700);
  } catch (_) {}

  // Park mouse at neutral.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
