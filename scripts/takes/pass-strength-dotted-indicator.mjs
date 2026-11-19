// type a password in stages so the dots fill and the checklist ticks off, ending fully green; then reveal it
export default async (film) => {
  await film.type("#password", "stash#2026", { delay: 70 });
  await film.hold(700);
  await film.type(null, "Ui", { delay: 120 });
  await film.hold(800);
  film.mark("hero");
  await film.click({ role: "button", name: /show password/i }, { hold: 1200 });
};
