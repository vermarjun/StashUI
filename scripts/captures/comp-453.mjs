/**
 * Capture choreography for comp-453
 * Breadcrumb with embedded Select for database selection (DatabaseIcon + Orion/Sigma/Dorado).
 * Sequence: dwell → click Select trigger → hover "Dorado" option → click it → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Dwell on breadcrumb
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(600);
  } catch (_) {}

  // Open the Select dropdown
  try {
    const selectTrigger = page.locator('[aria-label="Select database"]');
    await selectTrigger.waitFor({ state: 'visible', timeout: 4000 });
    await selectTrigger.click();
    await wait(1000);
  } catch (err) {
    try {
      const combobox = page.getByRole('combobox');
      await combobox.click();
      await wait(1000);
    } catch (_) {}
  }

  // Hover over "Dorado" option
  try {
    const doradoOption = page.getByRole('option', { name: /dorado/i });
    await doradoOption.waitFor({ state: 'visible', timeout: 3000 });
    await doradoOption.hover();
    await wait(600);
  } catch (_) {}

  // Click "Dorado" to select
  try {
    const doradoOption = page.getByRole('option', { name: /dorado/i });
    await doradoOption.click();
    await wait(600);
  } catch (err) {
    try {
      await page.keyboard.press('Escape');
      await wait(400);
    } catch (_) {}
  }

  // End near center
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
