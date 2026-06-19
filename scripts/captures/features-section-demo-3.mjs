// Choreography for features-section-demo-3
// Rich bento-grid features section: heading + 4 feature cards arranged in a 6-col grid.
// Cards include: SkeletonOne (linear issue tracker screenshot), SkeletonTwo (stacked
// polaroid images with hover scale), SkeletonThree (YouTube thumbnail with blur-on-hover),
// SkeletonFour (spinning COBE globe). Section has py-10 lg:py-40 — tall multi-screen.
// Strategy: scroll down slowly revealing cards, hover image stack + YouTube card, then back to top.

export default async function choreograph({ page, W, H }) {
  // Wait for the section to render
  try {
    await page.locator(".grid").first().waitFor({ state: "visible", timeout: 6000 });
  } catch (e) {
    // fallback
  }

  await page.waitForTimeout(700);

  // --- Scroll down slowly to reveal the bento grid ---
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(600);
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(600);

  // --- Hover SkeletonTwo (stacked polaroid images) — triggers scale on individual images ---
  // SkeletonTwo is in the 2nd feature card (col-span-2, border-b)
  try {
    const imageCards = page.locator(".rounded-xl.border");
    const firstImageCard = imageCards.first();
    const box = await firstImageCard.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
      await page.waitForTimeout(800);
      // Move to the next stacked image
      await page.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2, { steps: 15 });
      await page.waitForTimeout(600);
    }
  } catch (e) {
    // ignore
  }

  // --- Hover SkeletonThree (YouTube thumbnail) — blurs the image on hover ---
  try {
    const youtubeLink = page.locator("a[href*='youtube']").first();
    const box = await youtubeLink.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
      await page.waitForTimeout(900);
    }
  } catch (e) {
    // fallback: try group/image locator
    try {
      const imgGroup = page.locator(".group\\/image").first();
      const box = await imgGroup.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
        await page.waitForTimeout(900);
      }
    } catch (e2) {
      // ignore
    }
  }

  // Move mouse to neutral
  await page.mouse.move(W / 2, H / 2, { steps: 10 });
  await page.waitForTimeout(400);

  // --- Scroll down further to reveal globe (SkeletonFour) ---
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(800);

  // Let the spinning globe render for a moment
  await page.waitForTimeout(700);

  // --- Scroll back to top ---
  await page.mouse.wheel(0, -1400);
  await page.waitForTimeout(700);

  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(600);
}
