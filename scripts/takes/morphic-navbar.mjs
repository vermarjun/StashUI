// Morphic navbar: click a link so the bar splits around it, then press-drag to scrub the split along the bar
export default async (film) => {
  await film.click({ role: "link", name: "Notes" }, { hold: 800 });
  const home = await film.page.getByRole("link", { name: "Home" }).boundingBox();
  const about = await film.page.getByRole("link", { name: "About" }).boundingBox();
  const y = home.y + home.height / 2;
  await film.glide({ x: home.x + home.width / 2, y }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: about.x + about.width / 2, y }, { secs: 1.4 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(900);
};
