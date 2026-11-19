// Hover the avatar and dwell on the profile hover card.
export default async (film) => {
  const avatar = film.page.locator("[data-rec-root] img[alt=Avatar]").first();
  await film.hover(avatar, { hold: 2400 });
  film.mark("hero");
  await film.hold(600);
};
