// comp-231 — timezone search: open and search "tokyo", then pick it
export default async (film) => {
  await film.click({ role: "combobox" }, { hold: 1300 });
  await film.type('input[placeholder="Search timezone..."]', "tokyo", { hold: 900 });
  film.mark("hero");
  await film.click({ role: "option", name: /Tokyo/ }, { hold: 1300 });
};
