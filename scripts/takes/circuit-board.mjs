// Circuit board: let the traces glow, then hover the tech cards
export default async (film) => {
  await film.hold(1200);
  film.mark("hero");
  await film.hover({ text: "Turbopack" }, { hold: 1200 });
  await film.hover({ text: "Speedy Web Compiler" }, { hold: 1200 });
};
