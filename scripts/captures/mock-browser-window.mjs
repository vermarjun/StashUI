// mock-browser-window: BrowserWindow component with macOS-style chrome,
// address bar, and an optional sidebar. Demo renders default (minimal header,
// no children). Choreography: hover the traffic-light dots to reveal their
// hover states, then drift across the content area and return to start.
export default async function capture(page, { W, H, wait }) {
  // Initial settle
  try {
    await wait(600);
  } catch (_) {}

  // Hover near the traffic-light dots (top-left of the window header)
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 1 });
    await page.mouse.move(W * 0.32, H * 0.38, { steps: 30 });
    await wait(500);
  } catch (_) {}

  // Nudge across the three dots
  try {
    await page.mouse.move(W * 0.34, H * 0.38, { steps: 10 });
    await wait(400);
    await page.mouse.move(W * 0.36, H * 0.38, { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Drift into the content body
  try {
    await page.mouse.move(W * 0.5, H * 0.55, { steps: 40 });
    await wait(700);
  } catch (_) {}

  // Drift to the right side of the content area
  try {
    await page.mouse.move(W * 0.68, H * 0.6, { steps: 35 });
    await wait(600);
  } catch (_) {}

  // Return toward the dots area to close the loop
  try {
    await page.mouse.move(W * 0.32, H * 0.38, { steps: 45 });
    await wait(400);
  } catch (_) {}
}
