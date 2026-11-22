// blog-grid — hover a post so its cover zooms, then scroll the grid
export default async (film) => {
  await film.hover({ text: "Design Systems That Scale" }, { hold: 1300 });
  film.mark("hero");
  await film.scroll(420, { secs: 1.6 });
  await film.hover({ text: "Microinteractions That Delight" }, { hold: 1200 });
};
