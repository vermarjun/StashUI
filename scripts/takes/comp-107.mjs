// switch the alignment to the right and back, showing the active icon state
export default async (film) => {
  await film.click("[data-rec-root] [aria-label='Align Right']", { hold: 1300 });
  film.mark("hero");
  await film.hold(600);
  await film.click("[data-rec-root] [aria-label='Align Center']", { hold: 1100 });
};
