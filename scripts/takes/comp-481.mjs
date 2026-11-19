// grab the Email column's grip and drag it left over Name so the whole column (cells too) reorders
export default async (film) => {
  const grips = film.page.locator("[data-rec-root] thead [aria-label='Drag to reorder']");
  const email = await grips.nth(1).boundingBox();
  const name = await film.page.locator("[data-rec-root] thead th").nth(0).boundingBox();
  const y = email.y + email.height / 2;
  await film.glide({ x: email.x + email.width / 2, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(200);
  await film.glide({ x: name.x + name.width * 0.25, y }, { secs: 1.2 });
  film.mark("hero");
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(1300);
};
