// Spoiler text: clicks both hidden spoilers so the speck cloud scatters and reveals the text
export default async (film) => {
  const spoilers = film.page.locator("[data-rec-root] span[role=button]");
  await film.click(spoilers.nth(0), { hold: 1300 });
  film.mark("hero");
  await film.click(spoilers.nth(0), { hold: 1300 });
};
