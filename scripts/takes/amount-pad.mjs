// Tap out $125 on the keypad so the digits spring in, then send it.
export default async (film) => {
  for (const key of ["1", "2", "5"]) {
    await film.click({ role: "button", name: new RegExp(`^${key}$`) }, { hold: 320 });
  }
  film.mark("hero");
  await film.hold(600);
  await film.click({ role: "button", name: /^Send/ }, { hold: 1400 });
};
