// Video gallery: scroll to the grid, hover a thumbnail for its overlay, filter by category
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(330, { secs: 1.2 });
  await film.hover({ text: "Cinematic Journey" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Travel" }, { hold: 1200 });
  await film.click({ role: "button", name: "All" }, { hold: 900 });
};
