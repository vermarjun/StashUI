// Open the picker, drag the hue slider, pick the red preset swatch, close.
export default async (film) => {
  await film.click({ role: "button", name: /hsl/i }, { hold: 1300 });
  const slider = film.page.locator("body input[type=range]").first();
  const b = await slider.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width * 0.2, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width * 0.62, y }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(500);
  await film.click(film.page.locator("[data-radix-popper-content-wrapper] button").first(), { hold: 1300 });
  film.mark("hero");
  await film.press("Escape", { hold: 900 });
};
