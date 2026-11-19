// comp-375: open the account menu, hover an option, close it.
// Pin the portalled menu on-screen (the rig's page zoom otherwise scales its
// fixed coordinates and pushes it off-frame).
export default async (film) => {
  await film.click('button[aria-label="Open account menu"]', { hold: 900 });
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
