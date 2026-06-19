/**
 * Capture choreography for comp-581
 * App nav header with flat links + InfoMenu / NotificationMenu / UserMenu on the right.
 * Sequence: hover Home → hover Features → hover right-side icon buttons → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Home"
  try {
    const home = page.getByRole('link', { name: /^home$/i });
    await home.waitFor({ state: 'visible', timeout: 4000 });
    await home.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Home').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Features"
  try {
    const features = page.getByRole('link', { name: /^features$/i });
    await features.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Features').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Pricing"
  try {
    const pricing = page.getByRole('link', { name: /^pricing$/i });
    await pricing.hover();
    await page.waitForTimeout(500);
  } catch (_) {}

  // Hover notification/info icon button (right side)
  try {
    const iconBtns = page.getByRole('button');
    const count = await iconBtns.count();
    if (count > 0) {
      await iconBtns.last().hover();
      await page.waitForTimeout(700);
    }
  } catch (_) {}

  // Rest — move back toward logo
  try {
    await page.mouse.move(W * 0.1, H * 0.08, { steps: 12 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
