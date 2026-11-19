// comp-366: open the row's ellipsis menu, hover an option, close it.
// The rig renders the page at CSS zoom; Radix places portalled menus from
// unscaled coordinates, so the open menu lands off-frame. Pin it on-screen.
export default async (film) => {
  await film.click('button[aria-label="Open edit menu"]', { hold: 900 });
  await film.page.evaluate(() => {
    const c = document.querySelector('[data-slot="dropdown-menu-content"]');
    const w = c?.closest("[data-radix-popper-content-wrapper]");
    if (w) { w.style.position = "fixed"; w.style.left = "300px"; w.style.top = "110px"; w.style.transform = "none"; w.style.zIndex = "60"; }
  });
  await film.hold(700);
  film.mark("hero");
  await film.hover({ role: "menuitem", name: /option 2/i }, { hold: 900 });
  await film.press("Escape", { hold: 600 });
};
