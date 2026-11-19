// Click the + button, dwell on the Add block menu, then close it.
export default async (film) => {
  await film.click({ role: "button", name: /open edit menu/i }, { hold: 1000 });
  // The recorder zooms the page; that zoom is applied twice to portalled
  // poppers, throwing tall menus off-screen. Un-zoom the portal in place.
  await film.page.evaluate(() => {
    const z = window.__recZoom || 1;
    document.querySelectorAll("[data-radix-popper-content-wrapper]").forEach((w) => {
      w.style.zoom = String(1 / z);
    });
  });
  await film.hover({ text: "Quote", exact: true }, { hold: 900 });
  await film.hover({ text: "Heading 1", exact: true }, { hold: 700 });
  film.mark("hero");
  await film.hold(500);
  await film.press("Escape");
};
