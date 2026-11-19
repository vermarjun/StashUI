// Open the account menu, toggle the status-bar checkbox, then close.
export default async (film) => {
  await film.click({ role: "button", name: /open menu/i }, { hold: 1000 });
  // The recorder zooms the page; that zoom is applied twice to portalled
  // poppers, throwing tall menus off-screen. Un-zoom the portal in place.
  await film.page.evaluate(() => {
    const z = window.__recZoom || 1;
    document.querySelectorAll("[data-radix-popper-content-wrapper]").forEach((w) => {
      w.style.zoom = String(1 / z);
    });
  });
  await film.hover({ role: "menuitem", name: /billing/i }, { hold: 700 });
  await film.click({ role: "menuitemcheckbox", name: /show status bar/i }, { hold: 900 });
  film.mark("hero");
  await film.hold(400);
  await film.press("Escape");
};
