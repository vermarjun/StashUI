// Time machine stack: step back through two snapshots (front panel flies past), then forward again
export default async (film) => {
  await film.click({ role: "button", name: /^older$/i }, { hold: 1000 });
  await film.click({ role: "button", name: /^older$/i }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "button", name: /^newer$/i }, { hold: 1000 });
};
