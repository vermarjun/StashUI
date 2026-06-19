/**
 * Capture choreography for flip-card.
 *
 * The demo shows two FlipCard components side-by-side: one flips on Y axis
 * (default), one on X axis. Both use CSS group-hover to rotate 180 deg.
 * Strategy: hover the first card (Y-flip) → dwell on back face → move away to
 * reset → hover the second card (X-flip) → dwell on back face → move away to
 * reset. End in resting state (both front faces visible).
 */
export default async function capture(page, { W, H, wait }) {
  await wait(600);

  // Cards are direct children of the flex wrapper
  let cards;
  try {
    const wrapper = page.locator(".flex.items-center.justify-center.gap-8").first();
    await wrapper.waitFor({ state: "visible", timeout: 8000 });
    cards = wrapper.locator("> div");
  } catch {
    cards = null;
  }

  const cardCount = cards ? await cards.count().catch(() => 0) : 0;

  const hoverCard = async (box) => {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy, { steps: 14 }).catch(() => {});
  };

  const leaveCard = async () => {
    // Move well outside both cards so group-hover deactivates
    await page.mouse.move(W * 0.02, H * 0.02, { steps: 16 }).catch(() => {});
  };

  if (cardCount >= 2) {
    // --- Y-axis flip card (first) ---
    try {
      const box1 = await cards.nth(0).boundingBox();
      if (box1) {
        await hoverCard(box1);
        // 500 ms for the 500 ms transition to complete
        await wait(550);
        // Dwell on back face
        await wait(700);
        await leaveCard();
        // Allow front to restore
        await wait(600);
      }
    } catch {
      // continue
    }

    // --- X-axis flip card (second) ---
    try {
      const box2 = await cards.nth(1).boundingBox();
      if (box2) {
        await hoverCard(box2);
        await wait(550);
        // Dwell on back face
        await wait(700);
        await leaveCard();
        await wait(600);
      }
    } catch {
      // continue
    }
  } else {
    // Fallback: approximate card positions
    const estimatedCards = [
      { x: W * 0.28, y: H * 0.15, width: W * 0.18, height: H * 0.65 },
      { x: W * 0.54, y: H * 0.15, width: W * 0.18, height: H * 0.65 },
    ];
    for (const box of estimatedCards) {
      try {
        await hoverCard(box);
        await wait(550);
        await wait(700);
        await leaveCard();
        await wait(600);
      } catch {
        // continue
      }
    }
  }

  // Final rest — both cards showing front face
  await wait(400);
}
