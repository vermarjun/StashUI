// hold through two timed flips of the origami logo stack
export default async (film) => {
  film.mark("hero");
  await film.hideCursor();
  await film.hold(5200);
};
