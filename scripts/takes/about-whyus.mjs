// static about section: slow push-in over the headline and feature list
export default async (film) => {
  film.mark("kenburns");
  await film.hover(film.root(), { hold: 1600 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.68, y: film.H * 0.6 }, { secs: 0.9 });
  await film.hold(700);
};
