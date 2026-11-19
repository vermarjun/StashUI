// glide across the tilted logo column, pausing to show the hover ring
export default async (film) => {
  film.mark("kenburns");
  await film.hover('img[alt="Microsoft"]', { hold: 1400 });
  film.mark("hero");
  await film.hover('img[alt="Google"]', { hold: 1400 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.15 }, { secs: 0.6 });
};
