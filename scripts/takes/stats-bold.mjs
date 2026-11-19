// the headline and metrics count up on mount, then a slow push-in across the oversized figures
export default async (film) => {
  film.mark("kenburns");
  film.hideCursor();
  await film.hold(1200);
  film.mark("hero");
  await film.hold(3600);
};
