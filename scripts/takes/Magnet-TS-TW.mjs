// Magnet-TS-TW — cursor near the button and card so they pull toward it
export default async (film) => {
  await film.hover({ text: "Hover me" }, { hold: 1600 });
  film.mark("hero");
  await film.hover({ text: "Magnetic card" }, { hold: 1500 });
};
