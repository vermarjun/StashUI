// scroll the capped table body so the sticky header stays pinned while rows move
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 });
  await film.hold(400);
  await film.scroll(300, { secs: 2, hold: 700 });
  film.mark("hero");
  await film.scroll(-90, { secs: 1.2, hold: 900 });
};
