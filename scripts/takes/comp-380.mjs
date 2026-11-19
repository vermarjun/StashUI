// Open the theme menu and choose Dark so the trigger icon changes to a moon.
export default async (film) => {
  await film.click({ role: "button", name: /select theme/i }, { hold: 1000 });
  // The recorder zooms the page; that zoom is applied twice to portalled
  // poppers, throwing tall menus off-screen. Un-zoom the portal in place.
  await film.page.evaluate(() => {
    const z = window.__recZoom || 1;
    document.querySelectorAll("[data-radix-popper-content-wrapper]").forEach((w) => {
      w.style.zoom = String(1 / z);
    });
  });
  await film.hover({ role: "menuitem", name: /dark/i }, { hold: 700 });
  await film.click({ role: "menuitem", name: /dark/i }, { hold: 1200 });
  film.mark("hero");
  await film.hold(600);
};
