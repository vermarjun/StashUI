// Scrubber: drag Radius then Rotation; the label/value track and the preview shape update live
export default async (film) => {
  const drag = async (name, fromRatio, toRatio) => {
    const box = await film.page.getByRole("slider", { name }).boundingBox();
    const y = box.y + box.height / 2;
    await film.glide({ x: box.x + box.width * fromRatio, y }, { secs: 0.6 });
    await film.page.mouse.down();
    await film.glide({ x: box.x + box.width * toRatio, y }, { secs: 1.1 });
    await film.page.mouse.up();
  };
  await drag("Radius", 0.33, 0.9);
  film.mark("hero");
  await film.hold(300);
  await drag("Rotation", 0.4, 0.75);
  await film.hold(500);
};
