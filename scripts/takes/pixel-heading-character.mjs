// Pixel heading: the wave cycles fonts per character, then switch to multi
export default async (film) => {
  await film.hold(1600);
  film.mark("hero");
  await film.click({ role: "button", name: /^multi$/i }, { hold: 2200 });
};
