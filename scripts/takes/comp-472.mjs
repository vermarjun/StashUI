// select every row, then deselect one to show the indeterminate header state
export default async (film) => {
  await film.click("[data-rec-root] [role=checkbox] >> nth=0", { hold: 1300 });
  film.mark("hero");
  await film.hold(500);
  await film.click("[data-rec-root] tbody [role=checkbox] >> nth=1", { hold: 1300 });
};
