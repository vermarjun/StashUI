// side panel: open the sliding panel, hover an item, close it
export default async (film) => {
  await film.click({ role: "button", name: /open menu/i }, { hold: 1500 });
  await film.mark("hero");
  await film.hover({ text: "Analytics", exact: true }, { hold: 900 });
  await film.click({ role: "button", name: /close menu/i }, { hold: 1400 });
};
