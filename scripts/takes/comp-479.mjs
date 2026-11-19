// widen the Name column by dragging its resize handle, then sort by balance
export default async (film) => {
  const handle = film.page.locator("[data-rec-root] .cursor-col-resize").nth(0);
  const b = await handle.boundingBox();
  const x = b.x + b.width / 2;
  const y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(150);
  await film.glide({ x: x + 90, y }, { secs: 1.1 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(900);
  await film.click({ text: "Balance" }, { hold: 1400 });
};
