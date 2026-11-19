// Upload card: three progress bars fill (and the stalled ones restart); just watch. No cursor.
export default async (film) => {
  film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(3000);
};
