// LogoLoop-TS-TW — logo strip scrolls; hovering pauses it and scales the logo under the cursor
export default async (film) => {
  await film.hold(1800);
  film.mark("hero");
  const strip = film.page.getByRole("region", { name: "Customer logos" });
  const b = await strip.boundingBox();
  await film.hover({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { hold: 1800 });
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height + 120 }, { secs: 0.7 });
  await film.hold(1200);
};
