// scroll so the pinned card rail slides horizontally; the preview wrapper's
// overflow is relaxed at runtime so position:sticky can pin the rail
export default async (film) => {
  await film.page.evaluate(() => {
    const r = document.querySelector('[data-rec-root]');
    if (r) r.style.overflow = 'visible';
  });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.5 });
  await film.hold(400);
  await film.scroll(700, { secs: 2.6, hold: 500 });
  film.mark("hero");
  await film.scroll(620, { secs: 2.2, hold: 700 });
};
