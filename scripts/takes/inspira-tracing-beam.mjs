// the demo fits the viewport, so give the page room and nudge it down/up
export default async (film) => {
  await film.page.evaluate(() => {
    const spacer = document.createElement("div");
    spacer.style.height = "1200px";
    document.body.appendChild(spacer);
  });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.45 }, { secs: 0.5 });
  await film.hold(400);
  await film.scroll(300, { secs: 1.4, hold: 700 });
  film.mark("hero");
  await film.scroll(-300, { secs: 1.0, hold: 400 });
};
