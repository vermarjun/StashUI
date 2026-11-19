// the staggered blur reveal finishes on mount; hold the sharp result with a slow push-in
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  film.mark("hero");
  await film.hold(5200);
};
