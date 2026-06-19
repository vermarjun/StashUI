/**
 * Capture choreography for comp-445
 * Vertical tabs (muted background active style): Overview / Projects / Packages.
 * Sequence: click Projects → dwell → click Packages → dwell → click Overview → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Click "Projects" tab
  try {
    const projects = page.getByRole('tab', { name: /projects/i });
    await projects.waitFor({ state: 'visible', timeout: 4000 });
    await projects.click();
    await wait(800);
  } catch (err) {
    try {
      await page.mouse.move(cx - 80, cy - 20, { steps: 8 });
      await page.mouse.click(cx - 80, cy - 20);
      await wait(800);
    } catch (_) {}
  }

  // Click "Packages" tab
  try {
    const packages = page.getByRole('tab', { name: /packages/i });
    await packages.waitFor({ state: 'visible', timeout: 3000 });
    await packages.click();
    await wait(800);
  } catch (err) {
    try {
      await page.mouse.move(cx - 80, cy + 20, { steps: 8 });
      await page.mouse.click(cx - 80, cy + 20);
      await wait(800);
    } catch (_) {}
  }

  // Return to "Overview"
  try {
    const overview = page.getByRole('tab', { name: /overview/i });
    await overview.waitFor({ state: 'visible', timeout: 3000 });
    await overview.click();
    await wait(600);
  } catch (err) {
    try {
      await page.mouse.move(cx - 80, cy - 60, { steps: 8 });
      await page.mouse.click(cx - 80, cy - 60);
      await wait(600);
    } catch (_) {}
  }

  // Rest near center
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
