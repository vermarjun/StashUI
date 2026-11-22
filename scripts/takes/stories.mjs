// Stories: hover a video story so it plays, then glide along the row
export default async (film) => {
  const videos = film.page.locator("[data-rec-root] video");
  await film.hover(videos.first(), { hold: 2000 });
  film.mark("hero");
  await film.hover(videos.nth(1), { hold: 1800 });
};
