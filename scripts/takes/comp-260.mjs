// drag the max price thumb down the range so the label and Go row react
export default async (film) => {
  const thumbs = film.page.locator("[data-rec-root] [role=slider]");
  const maxThumb = thumbs.nth(1);
  const b = await maxThumb.boundingBox();
  const track = await film.page.locator("[data-rec-root] [data-slot=slider]").first().boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width / 2, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(150);
  await film.glide({ x: track.x + track.width * 0.58, y }, { secs: 1.2 });
  film.mark("hero");
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(900);
  await film.hover({ role: "button", name: /go/i }, { hold: 1100 });
};
