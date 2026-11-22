// Dither chart: switch between Line and Donut so each dithered chart draws itself in
export default async (film) => {
  await film.click({ role: "button", name: /^line$/i }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: /^donut$/i }, { hold: 1500 });
};
