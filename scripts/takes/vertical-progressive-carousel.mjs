// jump to the third slide via its progress bar, then the fourth
export default async (film) => {
  const bars = film.page.locator("[data-rec-root] button");
  await film.click(bars.nth(2), { hold: 1500 });
  film.mark("hero");
  await film.click(bars.nth(3), { hold: 1600 });
};
