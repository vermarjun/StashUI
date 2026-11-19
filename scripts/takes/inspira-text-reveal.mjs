// entrance-only word reveal (useInView once): slow push-in over both lines
export default async (film) => {
  film.mark("kenburns");
  await film.hover(film.root(), { hold: 1500 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.7, y: film.H * 0.62 }, { secs: 0.9 });
  await film.hold(900);
};
