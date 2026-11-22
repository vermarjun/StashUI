// Emoji reaction: tap Heart for the particle burst + odometer tick, then open the picker
// Picker items are role="menuitem" (not "button"), which is why the old take timed out.
export default async (film) => {
  await film.click({ role: "button", name: /^Heart,/ }, { hold: 500 });
  film.mark("hero");
  await film.hold(600);
  await film.hover({ role: "button", name: /more reactions/i }, { hold: 1000 });
  await film.click({ role: "menuitem", name: /react with 🔥/i }, { hold: 1100 });
};
