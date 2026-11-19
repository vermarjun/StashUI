// comp-232 — country select with flags: search "japan" and pick it
export default async (film) => {
  await film.click({ role: "combobox" }, { hold: 1300 });
  await film.type('input[placeholder="Search country..."]', "japan", { hold: 900 });
  film.mark("hero");
  await film.click({ role: "option", name: /Japan/ }, { hold: 1300 });
};
