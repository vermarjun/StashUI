// gravity — pick up a fallen pill and fling it across the pile
export default async (film) => {
  await film.hold(1200); // pills drop and settle
  const pill = film.page.locator("[data-rec-root]").getByText("typescript", { exact: true });
  const box = await pill.boundingBox();
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: x + 160, y: y - 260 }, { secs: 0.6 });
  film.mark("hero");
  await film.glide({ x: x + 320, y: y - 200 }, { secs: 0.25 });
  await film.page.mouse.up();
  await film.hold(1800);
};
