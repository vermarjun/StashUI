// ambient: the top row of brand logos drifts left under the edge mask, the static grid sits below
export default async (film) => {
  film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(2600);
};
