// highlighter: rough-notation draws a highlight/underline/box annotation across
// text on mount (isView=false, so it fires immediately via useLayoutEffect).
// The draw takes ~600-800 ms per annotation. Dwell to watch them finish, then
// move the mouse across the text to demonstrate the hover retrigger pattern.
export default async function capture(page, { W, H, wait }) {
  // Park mouse at a neutral position while the annotations draw on mount.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.15), { steps: 5 });
  } catch (_) {}

  // Wait for all annotation draw animations to complete (~2 s covers 3 items).
  try {
    await wait(2200);
  } catch (_) {}

  // Slowly sweep the mouse across the highlighted text (row 1 ~top 40% of H).
  // The ResizeObserver in the component redraws on resize; mouse hover shows
  // the text is selectable and the marker is real.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.38), { steps: 10 });
    await wait(200);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.38), { steps: 30 });
    await wait(300);
  } catch (_) {}

  // Sweep across row 2 (underline annotation ~60% of H).
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.6), { steps: 20 });
    await wait(200);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.6), { steps: 25 });
    await wait(300);
  } catch (_) {}

  // Return mouse to neutral — clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.15), { steps: 15 });
    await wait(400);
  } catch (_) {}
}
