/**
 * Choreography: tabs
 * The Tabs component renders a horizontal pill-tab row, clicking each tab
 * animates the active indicator (spring) and swaps the content card below.
 * Content area starts ~32px below tabs, so allow mt-32 in calculation.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(700);

  // Locate tabs by role — they render as <button> inside a centered max-w-2xl container.
  // Tab bar is near the top of the padded demo (py-8 → ~32px from top of container).
  // The demo container centers within the preview; tabs start around x=W*0.25.

  // Click "Design" tab (already active on mount — click to animate in)
  try {
    const btn = page.getByRole('button', { name: 'Design' });
    await btn.click();
    await wait(700);
  } catch (_) {}

  // Click "Development" tab
  try {
    const btn = page.getByRole('button', { name: 'Development' });
    await btn.click();
    await wait(800);
  } catch (_) {}

  // Click "Analytics" tab
  try {
    const btn = page.getByRole('button', { name: 'Analytics' });
    await btn.click();
    await wait(800);
  } catch (_) {}

  // Click "Settings" tab
  try {
    const btn = page.getByRole('button', { name: 'Settings' });
    await btn.click();
    await wait(700);
  } catch (_) {}

  // Return to "Design" to complete the loop
  try {
    const btn = page.getByRole('button', { name: 'Design' });
    await btn.click();
    await wait(600);
  } catch (_) {}
}
