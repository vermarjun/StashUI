// Number input with plus/minus: step 2048 up three times, then once down
export default async (film) => {
  const minus = film.page.locator("[data-rec-root] button").nth(0);
  const plus = film.page.locator("[data-rec-root] button").nth(1);
  await film.click(plus, { hold: 500 });
  await film.click(plus, { hold: 500 });
  await film.click(plus, { hold: 700 });
  film.mark("hero");
  await film.click(minus, { hold: 1100 });
};
