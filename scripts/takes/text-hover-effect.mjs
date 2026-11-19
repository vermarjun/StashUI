// The gradient stroke follows the cursor: sweep slowly across every letter.
export default async (film) => {
  const y = film.H / 2;
  await film.glide({ x: film.W * 0.15, y }, { secs: 0.7 });
  await film.glide({ x: film.W * 0.5, y: y - 30 }, { secs: 1.4 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.85, y }, { secs: 1.4 });
  await film.glide({ x: film.W * 0.4, y: y + 30 }, { secs: 1.6 });
  await film.hold(400);
};
