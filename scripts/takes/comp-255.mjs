// drag the thumb up to 100 so the input follows, then type a value and watch the thumb jump
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").first();
  const t = await thumb.boundingBox();
  const track = await film.page.locator("[data-rec-root] [data-slot=slider]").first().boundingBox();
  const y = t.y + t.height / 2;
  await film.glide({ x: t.x + t.width / 2, y }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: track.x + track.width + 6, y }, { secs: 1.0 });
  await film.page.mouse.up();
  await film.hold(700);
  film.mark("hero");
  await film.click({ role: "textbox", name: "Enter value" }, { hold: 300 });
  await film.page.keyboard.press("ControlOrMeta+a");
  await film.type(null, "60");
  await film.press("Enter");
  await film.hold(1100);
};
