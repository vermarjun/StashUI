// open instructions, search, and turn a preset on
export default async (film) => {
  await film.hover({ role: "button", name: /Instructions/ }, { hold: 2000 });
  await film.click({ role: "button", name: /Instructions/ }, { hold: 1000 });
  await film.type("input[placeholder*='Search instructions' i]", "tone", { delay: 45, hold: 350 });
  await film.mark("hero");
  await film.click({ text: "Formal Tone" }, { hold: 500 });
  await film.click({ x: 90, y: film.H - 90 }, { hold: 400 });
};
