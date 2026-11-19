// Multiselect: two chips are pre-selected; open the list, filter, add SvelteKit as a new chip
export default async (film) => {
  await film.click("[data-rec-root] input", { hold: 1000 });
  film.mark("hero");
  await film.type(null, "svel");
  await film.hold(600);
  await film.click({ text: "SvelteKit" }, { hold: 1000 });
  await film.press("Escape");
  await film.hold(600);
};
