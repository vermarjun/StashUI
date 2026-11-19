// animated-testimonials — click next twice to slide through the portraits
export default async (film) => {
  const next = film.page.locator("[data-rec-root] button").nth(1);
  await film.click(next, { hold: 1400 });
  film.mark("hero");
  await film.click(next, { hold: 1500 });
};
