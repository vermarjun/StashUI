// comp-233 — service category search: filter to Database Systems and pick it
export default async (film) => {
  await film.click({ role: "combobox" }, { hold: 1300 });
  await film.type('input[placeholder="Search services..."]', "database", { hold: 900 });
  film.mark("hero");
  await film.click({ role: "option", name: /Database Systems/ }, { hold: 1300 });
};
