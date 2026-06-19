// number-flow-trading: click Shuffle to cycle through price/diff values so
// NumberFlow digits animate (flow) visually. Dwell ~3.5 s between clicks so
// each digit transition completes before the next shuffle.
export default async function capture(page, { wait }) {
  // Let the component fully mount and number-flow hydrate
  await wait(600);

  // First shuffle — digits flow from initial to second set of values
  try {
    await page.getByRole('button', { name: /shuffle/i }).click();
  } catch (_) {}
  await wait(3500);

  // Second shuffle — flow to third set of values
  try {
    await page.getByRole('button', { name: /shuffle/i }).click();
  } catch (_) {}
  await wait(3500);

  // Third shuffle — back to the first set so the clip loops cleanly
  try {
    await page.getByRole('button', { name: /shuffle/i }).click();
  } catch (_) {}
  await wait(2000);
}
