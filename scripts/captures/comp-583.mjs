/**
 * Capture choreography for comp-583
 * Breadcrumb header: Logo / PersonalAccount / Projects / [project selector].
 * On mobile, middle crumbs collapse into an ellipsis dropdown.
 * Sequence: dwell → hover ellipsis (or "Personal Account") → open project selector dropdown → close → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Personal Account" breadcrumb (desktop only, visible when wide)
  try {
    const personalAccount = page.getByRole('link', { name: /personal account/i });
    await personalAccount.waitFor({ state: 'visible', timeout: 4000 });
    await personalAccount.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      // Fallback: try ellipsis trigger (mobile overflow)
      const ellipsis = page.getByRole('button', { name: /toggle menu/i });
      await ellipsis.hover();
      await page.waitForTimeout(700);
      await ellipsis.click();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Projects" breadcrumb
  try {
    const projects = page.getByRole('link', { name: /^projects$/i });
    await projects.hover();
    await page.waitForTimeout(600);
  } catch (_) {}

  // Open the project select dropdown
  try {
    const selector = page.getByRole('combobox', { name: /select project/i });
    await selector.waitFor({ state: 'visible', timeout: 3000 });
    await selector.click();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      // Fallback: click the ghost button that wraps the SelectTrigger
      const ghostBtn = page.getByRole('button', { name: /main project|origin project/i });
      await ghostBtn.first().click();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Close by pressing Escape and rest
  try {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
