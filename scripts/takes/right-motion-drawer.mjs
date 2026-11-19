// open the right drawer, hover its menu, then click the overlay to close
export default async (film) => {
  await film.hover("[data-rec-root] button", { hold: 1500 });
  await film.click("[data-rec-root] button", { hold: 1500 });
  await film.hover({ text: "About" }, { hold: 900 });
  await film.mark("hero");
  await film.click({ x: 100, y: film.H / 2 }, { hold: 700 });
};
