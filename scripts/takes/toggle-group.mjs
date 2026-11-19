// toggle-group — add italic + underline to the heading, then switch alignment to centre
export default async (film) => {
  await film.click("[data-rec-root] [aria-label='Italic']", { hold: 750 });
  await film.click("[data-rec-root] [aria-label='Underline']", { hold: 750 });
  film.mark("hero");
  await film.click("[data-rec-root] [aria-label='Center align']", { hold: 1000 });
  await film.click("[data-rec-root] [aria-label='Right align']", { hold: 1000 });
};
