// comp-06 — email input with error state (aria-invalid, defaultValue already
// set). Click the field to show the error focus ring, then move away to
// display the error message in its destructive color.
export default async function capture(page, { W, H, wait }) {
  await wait(500);

  // Click the input to show the error focus ring
  try {
    await page.locator("input[aria-invalid], input").first().click({ timeout: 2000 });
  } catch {
    try {
      await page.mouse.click(W / 2, H * 0.47);
    } catch { /* ignore */ }
  }
  await wait(700);

  // Move away so the error message below is clearly visible
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 10 });
  } catch { /* ignore */ }
  await wait(500);
}
