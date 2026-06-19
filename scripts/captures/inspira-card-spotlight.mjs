/**
 * Capture choreography for inspira-card-spotlight.
 *
 * The demo shows three CardSpotlight cards side-by-side. Each card paints a
 * radial-gradient spotlight that follows the cursor via onMouseMove.
 * Strategy: enter each card and sweep the cursor around so the spotlight is
 * clearly visible; leave between cards so the spotlight disappears (hidden far
 * off-screen), giving a clean punctuation.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(700);

  // The three cards share the class on the outer div with overflow-hidden rounded-xl border
  let cards;
  try {
    const wrapper = page.locator(".flex.flex-wrap").first();
    await wrapper.waitFor({ state: "visible", timeout: 8000 });
    cards = wrapper.locator("> div");
  } catch {
    cards = null;
  }

  const cardCount = cards ? await cards.count().catch(() => 0) : 0;

  const sweepCard = async (box) => {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const left = box.x + 6;
    const right = box.x + box.width - 6;
    const top = box.y + 6;
    const bottom = box.y + box.height - 6;

    // Enter from top-left corner
    await page.mouse.move(left, top, { steps: 14 }).catch(() => {});
    await wait(200);
    // Sweep right along top
    await page.mouse.move(right, top, { steps: 20 }).catch(() => {});
    await wait(180);
    // Diagonal to bottom-left
    await page.mouse.move(left, bottom, { steps: 22 }).catch(() => {});
    await wait(180);
    // Sweep right along bottom
    await page.mouse.move(right, bottom, { steps: 20 }).catch(() => {});
    await wait(180);
    // Centre dwell
    await page.mouse.move(cx, cy, { steps: 14 }).catch(() => {});
    await wait(350);
  };

  if (cardCount > 0) {
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      try {
        const box = await cards.nth(i).boundingBox();
        if (box) {
          await sweepCard(box);
          // Move off card so spotlight resets before next card
          await page.mouse.move(W * 0.02, H * 0.02, { steps: 10 });
          await wait(300);
        }
      } catch {
        // continue
      }
    }
  } else {
    // Fallback: sweep across estimated card positions
    const estimatedCards = [
      { x: W * 0.08, y: H * 0.2, width: W * 0.25, height: H * 0.45 },
      { x: W * 0.38, y: H * 0.2, width: W * 0.25, height: H * 0.45 },
      { x: W * 0.67, y: H * 0.2, width: W * 0.25, height: H * 0.45 },
    ];
    for (const box of estimatedCards) {
      try {
        await sweepCard(box);
        await page.mouse.move(W * 0.02, H * 0.02, { steps: 10 });
        await wait(300);
      } catch {
        // continue
      }
    }
  }

  // Leave all cards — spotlights hide (moved far off-screen by mouseleave handler)
  try {
    await page.mouse.move(W * 0.02, H * 0.02, { steps: 12 });
  } catch {
    // continue
  }
  await wait(500);
}
