// Bubble: tap the long message bubble to add a reaction, then tap again to clear it
export default async (film) => {
  await film.hover({ text: /Activation is up 18%/ }, { hold: 700 });
  await film.click({ text: /Activation is up 18%/ }, { hold: 1400 });
  film.mark("hero");
  await film.click(null, { hold: 900 });
};
