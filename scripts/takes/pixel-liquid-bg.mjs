// Cursor-reactive background: wander across it so the field bends around the pointer
export default async (film) => {
  await film.glide({ x: film.W * 0.35, y: film.H * 0.45 }, { secs: 0.7 });
  film.mark("hero");
  await film.drift({ secs: 4.6, rx: 320, ry: 170 });
};
