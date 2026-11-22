// Transaction list: open a row into its receipt, then close it back
export default async (film) => {
  await film.click({ text: "Everlane" }, { hold: 1600 });
  film.mark("hero");
  await film.click("[data-rec-root] .rounded-full.p-2", { hold: 1200 });
};
