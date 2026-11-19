// comp-239 — grouped multi-select listbox: add a veggie and a protein
export default async (film) => {
  await film.click({ role: "option", name: "Tomato" }, { hold: 900 });
  await film.click({ role: "option", name: "Tofu" }, { hold: 1000 });
  film.mark("hero");
  await film.hover({ text: "Condiments" }, { hold: 900 });
};
