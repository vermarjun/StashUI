// Ambient: the diagonal line shadow drifts behind "Fast"; slow push-in so the stripes read.
export default async (film) => {
  film.hideCursor();
  film.mark("kenburns");
  await film.hold(2400);
  film.mark("hero");
  await film.hold(2600);
};
