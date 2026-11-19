// scripts/takes/grid.mjs — static grid pattern with faded edges: slow camera push-in keeps it alive
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  film.mark("hero");
  await film.hold(5200);
};
