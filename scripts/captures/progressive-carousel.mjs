/**
 * Choreography: progressive-carousel
 *
 * Component: ProgressSlider with SliderBtnGroup / SliderBtn progress-bar buttons.
 * Demo renders 4 slides (picsum images). Buttons are thin progress-bar strips at
 * the bottom. Each auto-advances every 4 s; clicking a strip jumps to that slide
 * with a fast-forward animation.
 *
 * Strategy: locate the slim progress-bar buttons, click through slides 2 → 3 → 4
 * to capture the fade transition and progress-fill sweep.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the component mount and the first slide render.
  try {
    await wait(800);
  } catch (_) {}

  // The SliderBtnGroup renders 4 thin strip buttons near the bottom of the demo.
  // They are arranged as a row of flex-1 children. Approximate their bounding boxes
  // by locating all role="progressbar" parents (the SliderBtn wraps each strip).
  // Fall back to evenly splitting the lower quarter of the frame if selectors miss.

  let btnBoxes = [];
  try {
    // Each SliderBtn is a <button> that contains a div[role="progressbar"]
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

  // Compute click centers from bounding boxes, or fall back to estimated positions.
  function btnCenter(idx) {
    if (btnBoxes[idx]) {
      return {
        x: Math.round(btnBoxes[idx].x + btnBoxes[idx].width / 2),
        y: Math.round(btnBoxes[idx].y + btnBoxes[idx].height / 2),
      };
    }
    // Fallback: buttons span full width, 4 equal columns, near bottom of card area.
    const slotW = W / 4;
    return {
      x: Math.round(slotW * idx + slotW / 2),
      y: Math.round(H * 0.88),
    };
  }

  // Dwell on first slide so the progress bar starts filling.
  try {
    await wait(1200);
  } catch (_) {}

  // Click slide 2 button — fast-forward animation + fade transition.
  try {
    const c = btnCenter(1);
    await page.mouse.move(c.x, c.y, { steps: 6 });
    await wait(120);
    await page.mouse.click(c.x, c.y);
    await wait(600);
  } catch (_) {}

  // Dwell on slide 2, letting progress bar partially fill.
  try {
    await wait(1000);
  } catch (_) {}

  // Click slide 3 button.
  try {
    const c = btnCenter(2);
    await page.mouse.move(c.x, c.y, { steps: 6 });
    await wait(120);
    await page.mouse.click(c.x, c.y);
    await wait(600);
  } catch (_) {}

  // Dwell on slide 3.
  try {
    await wait(1000);
  } catch (_) {}

  // Click slide 4 button.
  try {
    const c = btnCenter(3);
    await page.mouse.move(c.x, c.y, { steps: 6 });
    await wait(120);
    await page.mouse.click(c.x, c.y);
    await wait(700);
  } catch (_) {}

  // Return near the start: click slide 1 button to close the loop.
  try {
    const c = btnCenter(0);
    await page.mouse.move(c.x, c.y, { steps: 8 });
    await wait(120);
    await page.mouse.click(c.x, c.y);
    await wait(500);
  } catch (_) {}

  // Park mouse in neutral area.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
