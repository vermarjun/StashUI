/**
 * Choreography: pattern-background
 * Three PatternBackground variants stacked (grid static, dots animated,
 * big-dots diagonal animated). Pure CSS keyframe animations injected via
 * <style> tag. Demo scrolls to show all three panels.
 * Scroll down slowly so all variants are seen mid-animation.
 */
export default async function choreograph({ page, W, H }) {
  // Park mouse at centre
  try {
    await page.mouse.move(W / 2, H / 2);
  } catch (e) {
    console.warn("mouse.move failed", e.message);
  }

  // Brief settle for CSS animations to initialise
  await new Promise((r) => setTimeout(r, 800));

  // Scroll down inside the overflow-auto container to reveal all three panels
  // The outer container is h-[600px] overflow-auto; inner content ~3×h-48 + gaps + padding ≈ 700 px
  try {
    await page.evaluate(() => {
      const container = document.querySelector(".overflow-auto");
      if (container) {
        container.scrollTop = 120;
      }
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.evaluate(() => {
      const container = document.querySelector(".overflow-auto");
      if (container) {
        container.scrollTop = 220;
      }
    });
  } catch (e) {
    console.warn("scroll failed", e.message);
  }

  // Dwell — animated dot panels mid-cycle
  await new Promise((r) => setTimeout(r, 3000));
}
