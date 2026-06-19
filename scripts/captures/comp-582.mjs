/**
 * Capture choreography for comp-582
 * Icon-only nav (Dashboard/Projects/Documentation/Team) with tooltips,
 * plus a language select and user menu on the right.
 * Sequence: hover Dashboard icon (tooltip) → hover Projects → hover Documentation → hover Team → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Dashboard" icon link (sr-only label)
  try {
    const dashboard = page.getByRole('link', { name: /dashboard/i });
    await dashboard.waitFor({ state: 'visible', timeout: 4000 });
    await dashboard.hover();
    await page.waitForTimeout(800); // wait for tooltip
  } catch (err) {
    try {
      // Fallback: hover the first nav icon by position
      await page.mouse.move(W * 0.22, H * 0.08, { steps: 8 });
      await page.waitForTimeout(800);
    } catch (_) {}
  }

  // Hover "Projects"
  try {
    const projects = page.getByRole('link', { name: /projects/i });
    await projects.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.mouse.move(W * 0.27, H * 0.08, { steps: 8 });
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Hover "Documentation"
  try {
    const docs = page.getByRole('link', { name: /documentation/i });
    await docs.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.mouse.move(W * 0.32, H * 0.08, { steps: 8 });
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Hover "Team"
  try {
    const team = page.getByRole('link', { name: /team/i });
    await team.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.mouse.move(W * 0.37, H * 0.08, { steps: 8 });
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Rest — back to logo area
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 12 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
