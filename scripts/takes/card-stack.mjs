// Card stack: ambient auto-rotation. Hold still so two flips play with the stacked offsets visible.
export default async (film) => {
  film.hideCursor();
  await film.hold(2900);
  film.mark("hero");
  await film.hold(2700);
};
