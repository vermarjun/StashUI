// variable-font-and-cursor — the word's weight and slant follow the cursor around the stage
export default async (film) => {
  await film.glide({ x: film.W * 0.2, y: film.H * 0.15 }, { secs: 0.6 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.85 }, { secs: 1.3 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.85, y: film.H * 0.4 }, { secs: 1.2 });
  await film.glide({ x: film.W * 0.3, y: film.H * 0.6 }, { secs: 1.1 });
};
