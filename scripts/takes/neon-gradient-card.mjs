// neon gradient card: ambient glow; the gradient border cycles on its own, so just let it breathe
export default async (film) => {
  film.hideCursor();
  await film.hold(1800);
  film.mark("hero");
  await film.hold(2800);
};
