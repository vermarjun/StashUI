// inspira-tracing-beam: a gradient SVG beam (cyan→violet→purple) traces down
// the left edge of a content column as the user scrolls. Choreography:
// settle → scroll down in steps → hold at bottom → scroll back to top.
export default async function capture(page, { W, H, wait }) {
  // Let SVG height measurement settle and spring initialise.
  try { await wait(700); } catch (_) {}

  // Move mouse into the content area so the beam is in frame.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.3), { steps: 8 });
    await wait(200);
  } catch (_) {}

  // Scroll down in 5 increments — beam segment chases scroll progress.
  const steps = 5;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.55));
    } catch (_) {}
    try { await wait(460); } catch (_) {}
  }

  // Dwell at bottom — fully-traced beam visible.
  try { await wait(600); } catch (_) {}

  // Return to top smoothly.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  try { await wait(900); } catch (_) {}
}
