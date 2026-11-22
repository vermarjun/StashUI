// Video ambient: let the glow breathe with the footage, toggle it off and back on to show the difference
export default async (film) => {
  await film.hold(1600);
  film.mark("hero");
  await film.click({ role: "button", name: /ambient glow/i }, { hold: 1200 });
  await film.click({ role: "button", name: /ambient glow/i }, { hold: 1200 });
};
