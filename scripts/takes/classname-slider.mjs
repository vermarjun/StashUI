// classname-slider — click dots to jump slides so non-focused slides fade to 20%
export default async (film) => {
  const dots = film.page.locator("[data-rec-root] button");
  await film.click(dots.nth(2), { hold: 1300 });
  film.mark("hero");
  await film.click(dots.nth(3), { hold: 1400 });
};
