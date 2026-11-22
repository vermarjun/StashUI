// MorphSlider: advance twice so the images melt into each other
export default async (film) => {
  await film.click("[data-rec-root] [aria-label^='Next']", { hold: 1300 });
  film.mark("hero");
  await film.click("[data-rec-root] [aria-label^='Next']", { hold: 1500 });
};
