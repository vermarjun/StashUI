/**
 * Choreography: horizontal-progressive-carousel
 *
 * Shares source (progressive-carousel.tsx) and demo with `progressive-carousel`.
 * The demo renders a horizontal layout (default vertical=false).
 * Strategy: same button-click approach as progressive-carousel — advance
 * through slides 2 → 3 → 4 → back to 1, capturing the fade + progress fill.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow mount and first-slide paint.
  try {
    await wait(800);
  } catch (_) {}

  // Locate SliderBtn elements (buttons containing a role="progressbar" div).
  let btnBoxes = [];
  try {
    const btns = page.locator('button:has([role="progressbar"])');
    const count = await btns.count();
    if (count >= 3) {
      for (let i = 0; i < count; i++) {
        try {
          const box = await btns.nth(i).boundingBox();
          if (box) btnBoxes.push(box);
        } catch (_) {}
      }
    }
  } catch (_) {}

  function btnCenter(idx) {
    if (btnBoxes[idx]) {
      return {
        x: Math.round(btnBoxes[idx].x + btnBoxes[idx].width / 2),
        y: Math.round(btnBoxes[idx].y + btnBoxes[idx].height / 2),
      };
    }
    // Fallback: 4 equal horizontal slots near bottom of preview.
    const slotW = W / 4;
    return {
      x: Math.round(slotW * idx + slotW / 2),
      y: Math.round(H * 0.88),
    };
  }

  // Let progress bar on slide 1 start filling.
  try {
    await wait(1000);
  } catch (_) {}

  // Advance to slide 2.
  try {
    const c = btnCenter(1);
    await page.mouse.move(c.x, c.y, { steps: 6 });
    await wait(100);
    await page.mouse.click(c.x, c.y);
    await wait(700);
  } catch (_) {}

  try {
    await wait(900);
  } catch (_) {}

  // Advance to slide 3.
  try {
    const c = btnCenter(2);
    await page.mouse.move(c.x, c.y, { steps: 6 });
    await wait(100);
    await page.mouse.click(c.x, c.y);
    await wait(700);
  } catch (_) {}

  try {
    await wait(900);
  } catch (_) {}

  // Advance to slide 4.
  try {
    const c = btnCenter(3);
    await page.mouse.move(c.x, c.y, { steps: 6 });
    await wait(100);
    await page.mouse.click(c.x, c.y);
    await wait(700);
  } catch (_) {}

  // Return to slide 1 to close the loop.
  try {
    const c = btnCenter(0);
    await page.mouse.move(c.x, c.y, { steps: 8 });
    await wait(100);
    await page.mouse.click(c.x, c.y);
    await wait(500);
  } catch (_) {}

  // Park mouse at centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
