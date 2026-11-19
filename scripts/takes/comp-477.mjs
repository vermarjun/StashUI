// tick the select-all header box, then clear one row to show partial selection
export default async (film) => {
  await film.click("[data-rec-root] [role=checkbox] >> nth=0", { hold: 1400 });
  film.mark("hero");
  await film.hold(500);
  await film.click("[data-rec-root] tbody [role=checkbox] >> nth=1", { hold: 1300 });
};
