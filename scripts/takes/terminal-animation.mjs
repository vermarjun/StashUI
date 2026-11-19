// Terminal animation: watch the first command type and stream, then switch to the test tab so it retypes
export default async (film) => {
  await film.hold(1600);
  await film.click({ role: "tab", name: "test" }, { hold: 2600 });
  film.mark("hero");
  await film.click({ role: "tab", name: "build" }, { hold: 1600 });
};
