// comp-229 — searchable framework select: open, type to filter, pick React
export default async (film) => {
  await film.click({ role: "combobox" }, { hold: 1300 });
  await film.type('input[placeholder="Search framework..."]', "rea", { hold: 900 });
  film.mark("hero");
  await film.click({ role: "option", name: /^React$/ }, { hold: 1300 });
};
