// Emoji reaction: tap Heart for the particle burst + odometer tick, then open the picker
export default async (film) => {
  await film.click({ role: "button", name: /^Heart,/ }, { hold: 500 });
  film.mark("hero");
  await film.hold(700);
  await film.hover({ role: "button", name: /more reactions/i }, { hold: 1400 });
  await film.click({ role: "button", name: /react with 🔥/i }, { hold: 1100 });
};
