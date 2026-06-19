// comp-85 — ghost button with ArrowLeftIcon that slides left on group-hover.
// Move the cursor onto the button to trigger the CSS group-hover translation,
// hold long enough to see the arrow shift, click once, then move away to rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Approach from the right so the leftward icon slide is most visible
  try {
    await page.mouse.move(W / 2 + 60, H / 2, { steps: 12 });
  } catch { /* ignore */ }
  await wait(200);

  // Hover the ghost button — triggers group-hover: arrow slides left
  try {
    await page.getByRole("button", { name: /Button/i }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  // Hold hover so the transition (150ms) is clearly visible in the recording
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

  // Move away — arrow returns to original position (group-hover ends)
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 12 });
  } catch { /* ignore */ }
  await wait(450);
}
