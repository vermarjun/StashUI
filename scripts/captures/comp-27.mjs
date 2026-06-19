// comp-27: Search input with loader and mic button
// Type: SEARCH — focus + type to trigger loading spinner, let it resolve
// Sequence: focus → type → loader spins → resolves to search icon → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  // Focus the search input
  try {
    const input = page.locator('input[type="search"]');
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(300);
  } catch (_) {}

  // Type to trigger the loading state
  try {
    await page.keyboard.type("component", { delay: 90 });
    await wait(200);
  } catch (_) {}

  // Pause while the loader spins (500ms debounce in component)
  await wait(700);

  // Type a bit more — loader resets
  try {
    await page.keyboard.type(" library", { delay: 80 });
    await wait(800);
  } catch (_) {}

  // Hover the mic button
  try {
    const micBtn = page.getByRole("button", { name: /press to speak/i });
    await micBtn.hover();
    await wait(400);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
