// The gradient word is revealed by the cursor: drift across the lettering.
export default async (film) => {
  await film.drift({ secs: 4.2, cx: film.W / 2, cy: film.H / 2, rx: 240, ry: 70 });
  film.mark("hero");
  await film.hold(500);
};
