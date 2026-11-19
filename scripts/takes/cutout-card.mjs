// cutout card: hovers it so the media zooms inside the cutout frame
export default async (film) => {
  const img = film.page.locator("[data-rec-root] img").first();
  await film.hover(img, { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "View →" }, { hold: 1200 });
};
