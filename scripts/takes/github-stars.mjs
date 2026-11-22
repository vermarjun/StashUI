// github-stars — replay the count-up: digits slide, the star fills, particles burst at the end
export default async (film) => {
  await film.click({ role: "button", name: /recount/i }, { hold: 400 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.38 }, { secs: 0.6 });
  await film.hold(1500);
  film.mark("hero");
  await film.hold(1200);
};
