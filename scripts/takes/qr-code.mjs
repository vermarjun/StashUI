// QR code: replace the link and watch every code redraw
export default async (film) => {
  await film.click("[data-rec-root] input", { hold: 300 });
  await film.page.keyboard.press("ControlOrMeta+A");
  await film.type(null, "https://www.openstreetmap.org/#map=13/38.7223/-9.1393");
  film.mark("hero");
  await film.hold(1200);
};
