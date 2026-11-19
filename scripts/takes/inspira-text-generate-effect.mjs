// words blur into focus one by one; slow push-in over the paragraph
export default async (film) => {
  film.mark("kenburns");
  await film.hover(film.root(), { hold: 1600 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.7, y: film.H * 0.62 }, { secs: 0.8 });
  await film.hold(700);
};
