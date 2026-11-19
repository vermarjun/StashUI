// let the progress bar fill and auto-advance one tip, then jump ahead with an indicator and back
export default async (film) => {
  await film.hold(2600);
  film.mark("hero");
  await film.click({ role: "button", name: "Go to tip 4" }, { hold: 1400 });
  await film.click({ role: "button", name: "Go to tip 1" }, { hold: 900 });
};
