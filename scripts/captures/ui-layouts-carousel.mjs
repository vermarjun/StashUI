/**
 * Choreography: ui-layouts-carousel
 *
 * Component: Carousel (carousel.tsx) — Embla-powered carousel with prev/next
 * buttons, dot navigation, and a snap-display counter.
 * Demo: 4 picsum images, loop:true. Prev/Next are ChevronLeft/Right buttons
 * positioned absolutely at left-3 / right-3, vertically centred on the slide.
 *
 * Strategy: click the Next button 3 times to advance through slides 2 → 3 → 4,
 * pausing between each to let Embla's scroll animation settle. End by clicking
 * the dot for slide 1 to close the loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow Embla to initialise and first image to paint.
  try {
    await wait(900);
  } catch (_) {}

  // Locate the Next button — SliderNextButton renders as <button type="button">
  // positioned absolute right-3, top-1/2 inside the Carousel div.
  // Use aria or positional fallback.
  async function clickNext() {
    try {
      // The next button is the rightmost of the two chevron buttons.
      const nextBtn = page.locator('button[type="button"]:not([disabled])').last();
      const box = await nextBtn.boundingBox();
      if (box) {
        const cx = Math.round(box.x + box.width / 2);
        const cy = Math.round(box.y + box.height / 2);
        await page.mouse.move(cx, cy, { steps: 5 });
        await wait(80);
        await page.mouse.click(cx, cy);
        return;
      }
    } catch (_) {}
    // Fallback: next button is near right edge, vertically centred in the slide area.
    const cx = Math.round(W * 0.92);
    const cy = Math.round(H * 0.42);
    await page.mouse.move(cx, cy, { steps: 5 });
    await wait(80);
    try { await page.mouse.click(cx, cy); } catch (_) {}
  }

  async function clickDot(idx) {
    try {
      // Dot buttons are small w-6 h-1 strips rendered in a flex row at bottom.
      const dots = page.locator('button[aria-label]');
      const count = await dots.count();
      if (count > idx) {
        const box = await dots.nth(idx).boundingBox();
        if (box) {
          const cx = Math.round(box.x + box.width / 2);
          const cy = Math.round(box.y + box.height / 2);
          await page.mouse.move(cx, cy, { steps: 5 });
          await wait(80);
          await page.mouse.click(cx, cy);
          return;
        }
      }
    } catch (_) {}
    // Fallback: dots are in lower 10% of frame, evenly spaced.
    const slotW = W / 4;
    const cx = Math.round(slotW * idx + slotW / 2);
    const cy = Math.round(H * 0.92);
    await page.mouse.move(cx, cy, { steps: 5 });
    await wait(80);
    try { await page.mouse.click(cx, cy); } catch (_) {}
  }

  // Advance: slide 1 → 2
  try {
    await clickNext();
    await wait(700);
  } catch (_) {}

  // Advance: slide 2 → 3
  try {
    await clickNext();
    await wait(700);
  } catch (_) {}

  // Advance: slide 3 → 4
  try {
    await clickNext();
    await wait(700);
  } catch (_) {}

  // Return to slide 1 via dot button (closes loop seam).
  try {
    await clickDot(0);
    await wait(600);
  } catch (_) {}

  // Park mouse at neutral centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
