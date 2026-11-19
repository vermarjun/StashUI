// hover the icon tabs so their tooltips name them, then switch to Projects
export default async (film) => {
  await film.hover("[data-rec-root] [role=tab] >> nth=0", { hold: 1400 });
  film.mark("hero");
  await film.hover("[data-rec-root] [role=tab] >> nth=1", { hold: 1300 });
  await film.click("[data-rec-root] [role=tab] >> nth=1", { hold: 1400 });
};
