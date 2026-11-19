// hover a vertical tab to show its accent bar, then click Packages
export default async (film) => {
  await film.hover("[data-rec-root] [role=tab] >> nth=1", { hold: 1300 });
  film.mark("hero");
  await film.click("[data-rec-root] [role=tab] >> nth=2", { hold: 1500 });
};
