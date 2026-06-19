/**
 * Capture choreography for team-troops (scroll:false).
 *
 * Component: TimelineAnimation demo — a compact vertical list of 3 steps
 * (Discovery / Design / Launch) inside a max-w-lg centred card. Elements
 * fade+blur in sequentially via useInView. No hover interactions.
 * Strategy: settle so all timeline items have animated in, then park.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Allow all sequential blur-in animations to complete
  // animationNum goes up to 5 at 0.5s delay each → ~3 s total; wait for the last
  try {
    await wait(700);
  } catch (_) {}

  // Move mouse to centre of the card to ensure it is in view for useInView
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
    await wait(3200);
  } catch (_) {}

  // Dwell so the fully-revealed card is clearly visible before the loop ends
  try {
    await wait(600);
  } catch (_) {}
}
