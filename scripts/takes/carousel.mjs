// carousel: glide over the active slide for the parallax tilt, then advance twice and back once
export default async (film) => {
  await film.glide({ x: film.W * 0.42, y: film.H * 0.35 }, { secs: 0.7 });
  await film.glide({ x: film.W * 0.58, y: film.H * 0.6 }, { secs: 0.9 });
  const next = film.page.getByTitle("Go to next slide");
  await film.click(next, { hold: 1300 });
  film.mark("hero");
  await film.click(next, { hold: 1300 });
  await film.click(film.page.getByTitle("Go to previous slide"), { hold: 1100 });
};
