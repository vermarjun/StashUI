// flip card: clicks it to flip to the profile back, then flips back
export default async (film) => {
  const card = film.page.locator("[data-rec-root] .cursor-pointer").first();
  await film.click(card, { hold: 1500 });
  film.mark("hero");
  await film.click(card, { hold: 1300 });
};
