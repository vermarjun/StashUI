// Chromatic image: move across the photo so the RGB split, displacement and tilt follow the pointer
export default async (film) => {
  await film.glide({ x: film.W * 0.3, y: film.H * 0.4 }, { secs: 0.7 });
  await film.drift({ secs: 2, rx: 280, ry: 140 });
  film.mark("hero");
  await film.drift({ secs: 2.2, rx: 280, ry: 140 });
};
