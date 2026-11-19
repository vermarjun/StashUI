// The orb turns to face and brighten under the pointer: circle it closely.
export default async (film) => {
  await film.drift({ secs: 3, cx: film.W / 2, cy: film.H / 2, rx: 130, ry: 120 });
  film.mark("hero");
  await film.drift({ secs: 1.6, cx: film.W / 2, cy: film.H / 2, rx: 90, ry: 100 });
};
