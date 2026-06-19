// comp-86 — default button with ArrowRightIcon that slides right on
// group-hover. Hover to trigger the translation animation, hold, click for
// active, move away to rest so the arrow retreats back left.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Approach from the left so the rightward icon slide reads clearly
  try {
    await page.mouse.move(W / 2 - 60, H / 2, { steps: 12 });
  } catch { /* ignore */ }
  await wait(200);

  // Hover the button — triggers group-hover: arrow slides right
  try {
    await page.getByRole("button", { name: /Button/i }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  // Hold hover so the translate-x transition is visible in the recording
  await wait(900);

  // Click to show active/pressed state
  try {
    await page.getByRole("button", { name: /Button/i }).click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2, H / 2);
    } catch { /* ignore */ }
  }
  await wait(400);

  // Move away — arrow returns to rest position (group-hover ends)
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 12 });
  } catch { /* ignore */ }
  await wait(450);
}
