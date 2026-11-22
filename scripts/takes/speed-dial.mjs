// Speed dial: open the FAB so actions fan out, then pick one
export default async (film) => {
  await film.click("[data-rec-root] [data-slot=speed-dial-trigger]", { hold: 1300 });
  film.mark("hero");
  await film.hover({ role: "menuitem", name: "Copy" }, { hold: 900 });
  await film.click({ role: "menuitem", name: "Like" }, { hold: 1300 });
};
