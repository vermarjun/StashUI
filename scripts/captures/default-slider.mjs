/**
 * Choreography: default-slider
 *
 * Component: DefaultSlider — Embla carousel with ChevronLeft/Right prev+next
 * buttons (absolutely positioned at left-4 / right-4, top-50%) and dot buttons
 * at the bottom. 4 Unsplash landscape images, loop:false.
 *
 * Strategy: click the Next button 3 times to advance through slides 1→2→3→4,
 * then click Prev once to return to slide 3 (closes near-start). Images are
 * square-cropped so the transition is clearly visible.
 */
export default async function capture(page, { W, H, wait }) {
  // Let Embla init and images begin loading.
  try {
    await wait(1000);
  } catch (_) {}

  // The Next button is a <button type="button"> with ChevronRight, right-4, top-50%.
  // Approximated at ~94% W, ~50% H inside the slider area.
  const nextX = Math.round(W * 0.92);
  const nextY = Math.round(H * 0.48);
  const prevX = Math.round(W * 0.08);
  const prevY = Math.round(H * 0.48);

  async function clickNext() {
    try {
      // Try to find the enabled next button specifically.
      const btns = page.locator('button[type="button"]:not([disabled])');
      const count = await btns.count();
      if (count >= 2) {
        // Next is the last enabled button (Prev may be disabled at start).
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
    await page.mouse.move(nextX, nextY, { steps: 6 });
    await wait(80);
    try { await page.mouse.click(nextX, nextY); } catch (_) {}
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
    await page.mouse.move(prevX, prevY, { steps: 6 });
    await wait(80);
    try { await page.mouse.click(prevX, prevY); } catch (_) {}
  }

  // Advance 1 → 2
  try {
    await clickNext();
    await wait(700);
  } catch (_) {}

  // Advance 2 → 3
  try {
    await clickNext();
    await wait(700);
  } catch (_) {}

  // Advance 3 → 4
  try {
    await clickNext();
    await wait(700);
  } catch (_) {}

  // Go back 4 → 3 (prev, closes loop near start).
  try {
    await clickPrev();
    await wait(600);
  } catch (_) {}

  // Park mouse at neutral.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
