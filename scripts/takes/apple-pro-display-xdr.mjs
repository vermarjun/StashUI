// Studio display: glide across the dock to magnify icons, then click the screen to switch wallpaper
export default async (film) => {
  const dock = film.page.getByRole("button", { name: "Downloads" });
  const box = await dock.boundingBox();
  if (box) {
    await film.glide({ x: box.x - 260, y: box.y + box.height / 2 }, { secs: 0.7 });
    await film.glide({ x: box.x + box.width / 2, y: box.y + box.height / 2 }, { secs: 1.4 });
    film.mark("hero");
    await film.hold(600);
  }
  await film.click({ role: "button", name: /cycle demo screen content/i }, { hold: 1400 });
};
