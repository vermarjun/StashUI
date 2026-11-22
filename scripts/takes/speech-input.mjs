// Speech input: tap the mic so the pulse rings start, then tap to stop
export default async (film) => {
  await film.click({ role: "button", name: /dictate/i }, { hold: 2200 });
  film.mark("hero");
  await film.click({ role: "button", name: /dictate/i }, { hold: 900 });
};
