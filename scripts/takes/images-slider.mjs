// keyboard-advance the hero slideshow twice to show the image transition
export default async (film) => {
  await film.hold(400);
  await film.press("ArrowRight", { hold: 1200 });
  film.mark("hero");
  await film.press("ArrowRight", { hold: 1200 });
};
