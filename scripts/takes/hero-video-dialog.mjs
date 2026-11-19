// Hover the thumbnail (play button swells), click it, let the video dialog zoom
// open and the YouTube player paint, then close it.
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] img").first();
  await film.hover(thumb, { hold: 900 });
  await film.click(thumb, { hold: 2600 });
  film.mark("hero");
  await film.hold(900);
  await film.press("Escape", { hold: 900 });
};
