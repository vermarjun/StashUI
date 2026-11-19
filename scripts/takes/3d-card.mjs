// 3D card: glides across the surface so the perspective tilt and parallax layers show
export default async (film) => {
  await film.glide({ x: film.W * 0.5 - 180, y: film.H * 0.5 }, { secs: 0.8 });
  film.mark("hero");
  await film.drift({ secs: 3.6, rx: 190, ry: 110 });
};
