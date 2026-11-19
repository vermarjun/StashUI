// shooting-stars — ambient: three streams of shooting stars cross a twinkling star field.
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(3200);
};
