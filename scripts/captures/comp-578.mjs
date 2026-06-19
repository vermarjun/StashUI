/**
 * Capture choreography for comp-578
 * Navigation header with "Features", "Pricing", "About" dropdown submenus.
 * Sequence: hover Features (dropdown opens) → hover Pricing (dropdown) → hover About (dropdown) → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Features" trigger to open its dropdown
  try {
    const featuresTrigger = page.getByRole('button', { name: /features/i });
    await featuresTrigger.waitFor({ state: 'visible', timeout: 4000 });
    await featuresTrigger.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.getByText('Features').first().hover();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Hover "Pricing" trigger
  try {
    const pricingTrigger = page.getByRole('button', { name: /pricing/i });
    await pricingTrigger.waitFor({ state: 'visible', timeout: 3000 });
    await pricingTrigger.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.getByText('Pricing').first().hover();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Hover "About" trigger
  try {
    const aboutTrigger = page.getByRole('button', { name: /about/i });
    await aboutTrigger.waitFor({ state: 'visible', timeout: 3000 });
    await aboutTrigger.hover();
    await page.waitForTimeout(800);
  } catch (err) {
    try {
      await page.getByText('About').first().hover();
      await page.waitForTimeout(800);
    } catch (_) {}
  }

  // Move away to close menu and return near start
  try {
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 15 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
