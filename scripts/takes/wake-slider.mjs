// Wake Slider: drag fast across the bars so a wake rises behind the handle
export default async (film) => {
  const box = await film.page.getByRole("slider").boundingBox();
  const y = box.y + box.height / 2;
  await film.glide({ x: box.x + box.width * 0.42, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: box.x + box.width * 0.9, y }, { secs: 0.6 });
  film.mark("hero");
  await film.glide({ x: box.x + box.width * 0.2, y }, { secs: 0.9 });
  await film.glide({ x: box.x + box.width * 0.65, y }, { secs: 0.8 });
  await film.page.mouse.up();
  await film.hold(800);
};
