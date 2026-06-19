// comp-24: Text input with a clear (×) button. Pre-filled with "Click to clear".
// Click the clear button to empty the field, then type fresh text and clear again.
export default async function capture(page, { W, H, wait }) {
  await wait(500);

  // The input is pre-filled — hover the clear button first to show intent
  try {
    const clearBtn = page.getByRole("button", { name: /clear input/i });
    await clearBtn.hover();
  } catch (_) {
    try {
      const input = page.locator("input").first();
      const box = await input.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width - 16, box.y + box.height / 2, { steps: 8 });
      }
    } catch (_) {}
  }
  await wait(450);

  // Click the clear button to erase the pre-filled value
  try {
    const clearBtn = page.getByRole("button", { name: /clear input/i });
    await clearBtn.click();
  } catch (_) {
    try {
      const input = page.locator("input").first();
      const box = await input.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width - 16, box.y + box.height / 2);
      }
    } catch (_) {}
  }
  await wait(400);

  // Now type fresh content so the clear button re-appears
  const text = "Fresh new content";
  for (const ch of text) {
    try {
      await page.keyboard.type(ch, { delay: 70 });
    } catch (_) {}
  }
  await wait(600);

  // Hover the clear button again
  try {
    const clearBtn = page.getByRole("button", { name: /clear input/i });
    await clearBtn.hover();
  } catch (_) {}
  await wait(400);

  // Click to clear the fresh text
  try {
    const clearBtn = page.getByRole("button", { name: /clear input/i });
    await clearBtn.click();
  } catch (_) {}
  await wait(600);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
