export default async function capture(page, { W, H, cfg, wait }) {
  // Interactive step-tracker widget. Start with step 3 active (shipped).
  // Click through steps to show the indicator & separator filling in.
  await wait(500);

  // Click step 4 "Out for delivery"
  try {
    const step4 = page.getByText("Out for delivery");
    await step4.click();
  } catch (_) {}
  await wait(600);

  // Click step 5 "Delivered" — all indicators become active
  try {
    const step5 = page.getByText("Delivered");
    await step5.click();
  } catch (_) {}
  await wait(700);

  // Pause to show all steps completed
  await wait(700);

  // Walk back: click step 2 to show partial completion
  try {
    const step2 = page.getByText("Payment confirmed");
    await step2.click();
  } catch (_) {}
  await wait(600);

  // Return to step 3 (starting position) for a clean loop
  try {
    const step3 = page.getByText("Shipped");
    await step3.click();
  } catch (_) {}
  await wait(600);
}
