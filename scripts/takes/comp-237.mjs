// comp-237 — single-select listbox: choose Vue, then move the selection to React
export default async (film) => {
  await film.click({ role: "option", name: "Vue" }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "option", name: "React" }, { hold: 1300 });
};
