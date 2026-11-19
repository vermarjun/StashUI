// variable-font weight/width follows the cursor across the word
export default async (film) => {
  const y = film.H * 0.5;
  await film.glide({ x: film.W * 0.12, y }, { secs: 0.6 });
  await film.glide({ x: film.W * 0.88, y }, { secs: 2.3 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.4, y }, { secs: 1.2 });
  await film.hold(500);
};
