// comp-230 — organisation search with the "New organization" action
export default async (film) => {
  await film.click({ role: "combobox" }, { hold: 1300 });
  await film.type('input[placeholder="Find organization"]', "cr", { hold: 800 });
  film.mark("hero");
  await film.click({ role: "option", name: /Cruip/ }, { hold: 1300 });
};
