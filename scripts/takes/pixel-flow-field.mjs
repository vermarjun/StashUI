// Pixel flow field: drag the cursor through the word so the pixels scatter in its wake and re-form
export default async (film) => {
  await film.glide({ x: film.W * 0.25, y: film.H * 0.5 }, { secs: 0.7 });
  await film.glide({ x: film.W * 0.75, y: film.H * 0.45 }, { secs: 1.6 });
  film.mark("hero");
  await film.drift({ secs: 2.4, cx: film.W * 0.5, cy: film.H * 0.5, rx: 220, ry: 80 });
};
