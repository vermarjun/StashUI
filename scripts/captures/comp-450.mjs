/**
 * Capture choreography for comp-450
 * Breadcrumb with dot (·) separators: HomeIcon → · → Components → · → Breadcrumb.
 * Sequence: dwell → hover home icon → hover Components → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Dwell on full breadcrumb
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(700);
  } catch (_) {}

  // Hover over the home icon link
  try {
    const homeLink = page.getByRole('link', { name: /home/i });
    await homeLink.waitFor({ state: 'visible', timeout: 4000 });
    await homeLink.hover();
    await wait(700);
  } catch (err) {
    try {
      await page.mouse.move(cx - 120, cy, { steps: 8 });
      await wait(700);
    } catch (_) {}
  }

  // Hover over "Components" link
  try {
    const componentsLink = page.getByRole('link', { name: /components/i });
    await componentsLink.hover();
    await wait(700);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(700);
    } catch (_) {}
  }

  // End near center
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
