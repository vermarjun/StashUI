// a display-only month grid: flip forward a month and back
export default async (film) => {
  await film.click({ role: "button", name: /Next Month/i }, { hold: 1600 });
  film.mark("hero");
  await film.click({ role: "button", name: /Previous Month/i }, { hold: 1400 });
};
