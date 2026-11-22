// Agent suggestion stack: a static illustration, so a slow push-in
export default async (film) => {
  film.hideCursor();
  film.mark("kenburns");
  await film.hold(2000);
  film.mark("hero");
  await film.hold(2500);
};
