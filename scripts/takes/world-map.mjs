// World map: ambient, the arcs draw themselves between cities; no cursor
export default async (film) => {
  film.hideCursor();
  await film.hold(2200);
  film.mark("hero");
  await film.hold(2600);
};
