// LineSidebar: glide down the list so labels and ticks bulge toward the cursor
export default async (film) => {
  await film.glide({ text: "Overview" }, { secs: 0.8 });
  await film.glide({ text: "Showcase" }, { secs: 1.4 });
  film.mark("hero");
  await film.glide({ text: "Support" }, { secs: 1.6 });
  await film.click({ text: "Templates" }, { hold: 900 });
};
