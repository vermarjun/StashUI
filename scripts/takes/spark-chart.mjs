// spark-chart — live watchlist: sparklines stream new points on their own
export default async (film) => {
  await film.hideCursor();
  await film.hold(2500);
  film.mark("hero");
  await film.hold(2500);
};
