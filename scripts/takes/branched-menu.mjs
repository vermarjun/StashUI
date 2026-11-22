// Branched Menu: pick an item, open the second section, trace the branch to a new pick
export default async (film) => {
  await film.click({ role: "button", name: "Configuration" }, { hold: 900 });
  await film.click({ role: "button", name: "Components" }, { hold: 1000 });
  await film.click({ role: "button", name: "Overlays" }, { hold: 1000 });
  film.mark("hero");
};
