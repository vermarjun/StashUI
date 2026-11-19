// toggle Wednesday on and Friday off so the day circles fill and empty, then restore
export default async (film) => {
  const day = (name) => film.page.locator("[data-rec-root] label").filter({ hasText: name });
  await film.click(day("Wednesday"), { hold: 1000 });
  film.mark("hero");
  await film.click(day("Friday"), { hold: 1000 });
  await film.click(day("Wednesday"), { hold: 700 });
  await film.click(day("Friday"), { hold: 800 });
};
