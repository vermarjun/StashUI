// comp-29: Number input with chevron up/down buttons (react-aria, currency EUR)
// Type: NUMBER — click increment/decrement steppers
// Sequence: hover input → click increment × 3 → pause → click decrement × 2 → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Click the number input to focus it
  try {
    const input = page.locator("input[inputmode='numeric'], input[type='text']").first();
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(300);
  } catch (_) {}

  // Click increment button (chevron up) several times
  try {
    const incrementBtn = page.getByRole("button", { name: /increase/i })
      .or(page.locator('[slot="increment"]'));
    await incrementBtn.click();
    await wait(200);
    await incrementBtn.click();
    await wait(200);
    await incrementBtn.click();
    await wait(400);
  } catch (_) {}

  // Click decrement button (chevron down) a couple times
  try {
    const decrementBtn = page.getByRole("button", { name: /decrease/i })
      .or(page.locator('[slot="decrement"]'));
    await decrementBtn.click();
    await wait(200);
    await decrementBtn.click();
    await wait(400);
  } catch (_) {}

  // Move away to rest
  try {
    await page.mouse.move(cx, cy + 80, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
