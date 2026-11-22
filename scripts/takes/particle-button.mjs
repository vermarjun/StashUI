// Particle button: saves (spinner, check, particle burst), then a failing payment shakes
export default async (film) => {
  await film.click({ role: "button", name: /save changes/i }, { hold: 1250 });
  film.mark("hero");
  await film.hold(900);
  await film.click({ role: "button", name: /pay \$49/i }, { hold: 1800 });
};
