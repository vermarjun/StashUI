// Location picker: drag the map under the pin (pin lifts), let go so it glides to the curb and drops, confirm
export default async (film) => {
  const map = film.page.getByRole("button", { name: /Pickup map/ }).first();
  const b = await map.boundingBox();
  const cx = b.x + b.width * 0.5;
  const cy = b.y + b.height * 0.55;
  await film.glide({ x: cx, y: cy }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: cx - 110, y: cy - 70 }, { secs: 1.2 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1100);
  await film.click({ role: "button", name: /Confirm pickup/ }, { hold: 1100 });
};
