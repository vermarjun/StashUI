// scripts/takes/bg-media.mjs — glide across the image/texture so the whole surface is read
export default async (film) => {
  await film.glide({ x: film.W * 0.24, y: film.H * 0.38 }, { secs: 0.8 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.7, y: film.H * 0.6 }, { secs: 2.6 });
  await film.hold(900);
  await film.glide({ x: film.W * 0.46, y: film.H * 0.46 }, { secs: 1.2 });
};
