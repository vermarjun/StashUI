// Credit usage card: flip the auto-switch toggle, open the period picker and pick 90 days
export default async (film) => {
  await film.click("[data-rec-root] button[title=toggle]", { hold: 700 });
  await film.click("[data-rec-root] button[title=period]", { hold: 1000 });
  film.mark("hero");
  await film.click({ text: "90 Days" }, { hold: 900 });
  await film.click("[data-rec-root] button[title=toggle]", { hold: 600 });
};
