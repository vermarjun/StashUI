// GlassIcons-TS-TW — glass tiles lift and reveal their label on hover.
export default async (film) => {
  await film.hover({ role: "button", name: /home/i }, { hold: 1100 });
  await film.hover({ role: "button", name: /alerts/i }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ role: "button", name: /messages/i }, { hold: 1300 });
};
