// Number input with chevrons: nudge the EUR amount up twice, then down once
export default async (film) => {
  const up = film.page.locator("[data-rec-root] button").nth(0);
  const down = film.page.locator("[data-rec-root] button").nth(1);
  await film.click(up, { hold: 500 });
  await film.click(up, { hold: 700 });
  film.mark("hero");
  await film.click(down, { hold: 1100 });
};
