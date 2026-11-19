// comp-457: compact pagination; hover the arrow links as the camera pushes in.
export default async (film) => {
  film.mark("kenburns");
  await film.hover('a[aria-label="Go to next page"]', { hold: 1000 });
  film.mark("hero");
  await film.hover('a[aria-label="Go to previous page"]', { hold: 1000 });
  await film.hold(900);
};
