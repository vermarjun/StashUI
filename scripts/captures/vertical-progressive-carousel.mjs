/**
 * Choreography: vertical-progressive-carousel
 *
 * Shares source (progressive-carousel.tsx) and demo with `progressive-carousel`.
 * When this component variant is rendered the ProgressSlider is wired with
 * vertical=true, so progress bars fill vertically and the SliderBtnGroup is
 * typically arranged in a column.
 *
 * The demo itself does not distinguish horizontal vs vertical in layout —
 * the shared demo renders horizontal strip buttons. We still treat any
 * SliderBtn click as advancing vertically (the component honours vertical=true
 * in the progress span height rather than width).
 *
 * Strategy: locate the SliderBtn strip buttons, click down through slides
 * 2 → 3 → 4, capturing the vertical progress fill and opacity fade.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount and first frame.
  try {
    await wait(800);
  } catch (_) {}

  // Locate SliderBtn elements (button > div[role="progressbar"]).
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
    // Fallback: treat buttons as stacked vertically on the right side.
    const slotH = (H * 0.6) / 4;
    return {
      x: Math.round(W * 0.88),
      y: Math.round(H * 0.2 + slotH * idx + slotH / 2),
    };
  }

  // Dwell on slide 1 to show vertical progress bar filling.
  try {
    await wait(1100);
  } catch (_) {}

  // Click "down" to slide 2.
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

  // Click down to slide 3.
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

  // Click down to slide 4.
  try {
    const c = btnCenter(3);
    await page.mouse.move(c.x, c.y, { steps: 6 });
    await wait(100);
    await page.mouse.click(c.x, c.y);
    await wait(700);
  } catch (_) {}

  // Return "up" to slide 1 to close the seam.
  try {
    const c = btnCenter(0);
    await page.mouse.move(c.x, c.y, { steps: 10 });
    await wait(100);
    await page.mouse.click(c.x, c.y);
    await wait(500);
  } catch (_) {}

  // Park mouse at neutral.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
