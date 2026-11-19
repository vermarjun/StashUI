// sticky-banner — scroll the blog: the announcement bar stays pinned on top; then dismiss it
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.5 });
  await film.scroll(520, { secs: 2.0 });
  film.mark("hero");
  await film.hold(500);
  await film.click({ role: "button", name: /close banner/i }, { hold: 1200 });
};
