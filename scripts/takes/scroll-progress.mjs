// a long article: read down it (the gradient bar at the top fills), then glide back up
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.5 });
  await film.scroll(850, { secs: 2.6 });
  film.mark("hero");
  await film.hold(600);
  await film.scroll(-850, { secs: 1.6 });
  await film.hold(400);
};
