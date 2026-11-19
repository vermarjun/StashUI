// Gooey search: expand the pill, type a query, clear it, collapse back
export default async (film) => {
  await film.click("[data-rec-root] button", { hold: 900 });
  await film.type("input[type=search]", "design systems", { hold: 1200 });
  film.mark("hero");
  await film.press("Meta+a", { hold: 200 });
  await film.press("Backspace", { hold: 500 });
  await film.click({ x: film.W * 0.15, y: film.H * 0.15 }, { hold: 900 });
};
