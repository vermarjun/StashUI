// Lightbox grid: open a thumbnail into full view, then drag it down so it flies back into its slot
export default async (film) => {
  await film.click({ role: "button", name: /Open Peaks above the clouds/ }, { hold: 1300 });
  film.mark("hero");
  const cx = film.W / 2;
  const cy = film.H / 2;
  await film.glide({ x: cx, y: cy }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: cx + 30, y: cy + 230 }, { secs: 0.6 });
  await film.page.mouse.up();
  await film.hold(1000);
};
