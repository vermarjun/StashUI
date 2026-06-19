// comic-text: each ComicText element pops in with a spring scale+rotate
// entrance animation (motion/react animate). Three items stagger their mounts.
// Dwell to see all three pop in, then hold on the settled state.
export default async function capture(page, { W, H, wait }) {
  // Park cursor away from text so no unintentional hover states appear.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.05), { steps: 5 });
  } catch (_) {}

  // Short settle — let the page paint before animation begins.
  try {
    await wait(300);
  } catch (_) {}

  // Dwell through all three spring entrances (~0.6 s spring each, staggered).
  try {
    await wait(2800);
  } catch (_) {}

  // Hold on the settled, fully-visible state for a clean loop seam.
  try {
    await wait(600);
  } catch (_) {}
}
