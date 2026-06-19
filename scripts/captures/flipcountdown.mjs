// flipcountdown: the component auto-ticks every second. Just dwell long
// enough to capture several flip-digit transitions on the SECS segment
// (and occasionally on MINS/HRS), then let it loop naturally.
export default async function capture(page, { wait }) {
  // Allow the component to mount and compute the initial time remaining
  await wait(500);

  // Watch ~5 seconds of live countdown so at least 4–5 flip transitions
  // on the seconds digit are visible in the clip
  await wait(5000);

  // Brief pause at the end so the loop seam is smooth
  await wait(300);
}
