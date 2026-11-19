// open the edit-profile dialog, replace the name and save
export default async (film) => {
  await film.click({ role: "button", name: /Open Dialog/ }, { hold: 1100 });
  await film.click("#name", { hold: 250 });
  await film.press("ControlOrMeta+A", { hold: 150 });
  await film.type(null, "Maya Chen", { delay: 40 });
  await film.hold(500);
  film.mark("hero");
  await film.click({ role: "button", name: /Got it, thanks!/ }, { hold: 900 });
};
