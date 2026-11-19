// The highlight bar sweeps behind each phrase on mount; replay it once so the sweep is on camera.
export default async (film) => {
  await film.hold(1600);
  film.mark("hero");
  await film.click({ role: "button", name: /replay/i }, { hold: 3000 });
};
