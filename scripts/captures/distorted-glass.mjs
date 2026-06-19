// distorted-glass: SVG feTurbulence + feDisplacementMap + repeating radial
// gradient creates a frosted/distorted glass bar. Pure CSS + SVG — no JS
// animation. Renders only on xl breakpoints (w >= 1280px). Dwell + gentle
// drift to show the effect at rest.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Wait for styled-jsx glass-effect styles to be injected and painted.
  try {
    await wait(700);
  } catch (_) {}

  // Park cursor well away from the component so nothing occludes it.
  try {
    await page.mouse.move(cx, Math.round(H * 0.25), { steps: 8 });
    await wait(1200);
  } catch (_) {}

  // Slow horizontal drift left-to-right above the glass bar.
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.42), { steps: 35 });
    await wait(500);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.42), { steps: 50 });
    await wait(600);
  } catch (_) {}

  // Return to center — loop seam.
  try {
    await page.mouse.move(cx, Math.round(H * 0.38), { steps: 25 });
    await wait(600);
  } catch (_) {}
}
