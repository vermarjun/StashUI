// Dynamic Island: cycle the size presets so the clip shows it morph between
// states, then settle back to default for a clean loop seam.
export default async function capture(page, { wait }) {
  await wait(500);
  for (const preset of ["medium", "large", "compact", "default"]) {
    try {
      await page.getByRole("button", { name: preset, exact: true }).click();
    } catch {
      /* preset button not found — keep going */
    }
    await wait(850);
  }
  await wait(400);
}
