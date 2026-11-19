// Loaders: five enlarged loader tiles animate on their own; just watch. No cursor.
export default async (film) => {
  film.hideCursor();
  await film.hold(1800);
  film.mark("hero");
  await film.hold(3000);
};
