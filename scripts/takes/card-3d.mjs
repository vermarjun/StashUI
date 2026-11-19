// 3D tilt card: glide across so the layered card tilts in perspective
export default async (film) => {
  await film.glide({ x: film.W * 0.5 - 140, y: film.H * 0.5 }, { secs: 0.7 });
  film.mark("hero");
  await film.drift({ secs: 3.4, rx: 150, ry: 100 });
};
