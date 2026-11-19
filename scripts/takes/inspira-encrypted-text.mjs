// Both lines decrypt in turn; a slow push-in keeps the settled frame alive.
export default async (film) => {
  film.mark("kenburns");
  await film.hold(1600);
  film.mark("hero");
  await film.hold(2800);
};
