// advanced selection: opens the year view from the caption, picks March
export default async (film) => {
  await film.click({ role: "button", name: /2026/ }, { hold: 1400 });
  film.mark("hero");
  await film.click({ role: "button", name: /^Mar$/ }, { hold: 1500 });
};
