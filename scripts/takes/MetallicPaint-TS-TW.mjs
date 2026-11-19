// liquid metal flows across the logo silhouette on its own: no cursor, just watch it move
export default async (film) => {
  await film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(2800);
};
