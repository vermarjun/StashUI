// open the left drawer and show its navigation
export default async (film) => {
  await film.hover({ role: "button", name: /Open Drawer/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Open Drawer/ }, { hold: 1600 });
  await film.hover({ text: "Projects" }, { hold: 800 });
  await film.mark("hero");
  await film.press("Escape", { hold: 700 });
};
