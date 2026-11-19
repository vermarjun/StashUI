// comp-238 — multi-select listbox: add Angular and Svelte to the two defaults
export default async (film) => {
  await film.click({ role: "option", name: "Angular" }, { hold: 900 });
  await film.click({ role: "option", name: "Svelte" }, { hold: 1100 });
  film.mark("hero");
  await film.hold(900);
};
