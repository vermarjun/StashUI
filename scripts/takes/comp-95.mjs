// Hover the avatar account trigger, then press it.
export default async (film) => {
  const btn = film.page.getByRole("button").first();
  await film.glide({ x: film.W * 0.35, y: film.H * 0.5 }, { secs: 0.7 });
  await film.hover(btn, { hold: 1500 });
  await film.mark("hero");
  await film.click(btn, { hold: 700 });
};
