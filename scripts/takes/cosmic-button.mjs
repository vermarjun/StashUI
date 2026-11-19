// Cosmic button: the conic border spins on its own; hover so the ring swells, then press
export default async (film) => {
  await film.hold(700);
  await film.hover({ role: "button", name: "Launch your agent" }, { hold: 1600 });
  film.mark("hero");
  await film.click(null, { hold: 900 });
};
