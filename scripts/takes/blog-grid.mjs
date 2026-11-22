// blog-grid — hover a post so its cover zooms, then scroll exactly two rows into view
// (cards have no placeholder href, so no link-status bubble appears while hovering)
export default async (film) => {
  await film.hover({ text: "Design Systems That Scale" }, { hold: 1300 });
  film.mark("hero");
  // ~470px lands rows 2 and 3 fully in the 750px frame (rows are ~332px)
  await film.scroll(470, { secs: 1.8 });
  await film.hover({ text: "Typography That Speaks" }, { hold: 1200 });
};
