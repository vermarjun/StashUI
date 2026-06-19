// blur-vignette-img (blurvignetteimg): two side-by-side portrait images each
// wrapped in <BlurVignette> with a 15 px blur and 80 px transition length.
// Static visual — dwell so the viewer registers the edge-blur effect.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let the Unsplash images load.
  try { await wait(1200); } catch (_) {}

  // Park mouse between the two images to avoid any hover artifact.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  // Dwell ~2.5 s — purely static, just let the blur effect read clearly.
  try { await wait(2500); } catch (_) {}

  // Subtle drift right to frame both panels.
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.45), { steps: 18 });
  } catch (_) {}
  try { await wait(800); } catch (_) {}

  // Return to center.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 14 });
  } catch (_) {}
  try { await wait(300); } catch (_) {}
}
