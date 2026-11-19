// Folder-TS-TW — hover lifts the folder, click fans the photos out, nudge one, click again to close
export default async (film) => {
  const folder = "[data-rec-root] .group";
  await film.hover(folder, { hold: 900 });
  await film.click(folder, { hold: 1200 });
  film.mark("hero");
  const box = await film.page.locator(folder).first().boundingBox();
  await film.hover({ x: box.x + box.width * 0.85, y: box.y - box.height * 0.45 }, { hold: 900 });
  await film.click(folder, { hold: 1100 });
};
