// Presentation: wait for the deck to load, then flip through slides from the thumbnail rail
export default async (film) => {
  await film.hold(1200);
  const thumbs = film.page.locator("[data-rec-root] [data-slot=presentation-thumbnail-item]");
  await film.click(thumbs.nth(1), { hold: 1400 });
  film.mark("hero");
  await film.click(thumbs.nth(2), { hold: 1400 });
};
