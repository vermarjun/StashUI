/**
 * Capture choreography for: hovercard1 (hover-card1.tsx)
 * Behaviour: Landscape image card with a fixed bottom bar. The image scales
 * from 1.05 → 1.0 on hover (subtle zoom-out). The circular "Visit" button in
 * the bottom-right expands on its own hover: a text label slides in from the
 * left while the icon stays right-anchored.
 * Choreography: hover image to trigger zoom, then move to button to expand it,
 * hold, move away — repeat once.
 */

export default async function choreograph({ page, W, H }) {
  // The article is the top-level element
  const article = page.locator('article').first();
  const visitBtn = page.locator('button').first();

  // Settle: remote Unsplash image
  await page.waitForTimeout(700);

  for (let pass = 0; pass < 2; pass++) {
    try {
      const artBox = await article.boundingBox();
      if (!artBox) throw new Error('article not found');

      const imgCx = artBox.x + artBox.width / 2;
      const imgCy = artBox.y + artBox.height * 0.4;

      // Hover over image to trigger scale
      await page.mouse.move(imgCx, imgCy, { steps: 12 });
      await page.waitForTimeout(800);

      // Move to the "Visit" button to expand it
      try {
        const btnBox = await visitBtn.boundingBox();
        if (btnBox) {
          const bx = btnBox.x + btnBox.width / 2;
          const by = btnBox.y + btnBox.height / 2;
          await page.mouse.move(bx, by, { steps: 10 });
          await page.waitForTimeout(900);
        }
      } catch (e) {
        console.error(`[hovercard1] button hover pass ${pass}:`, e.message);
      }

      // Move away to reset
      await page.mouse.move(W / 2, 30, { steps: 12 });
      await page.waitForTimeout(600);
    } catch (e) {
      console.error(`[hovercard1] pass ${pass} error:`, e.message);
    }
  }

  // End near resting
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.error('[hovercard1] end error:', e.message);
  }
}
