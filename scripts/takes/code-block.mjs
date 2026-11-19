// code-block — switching the tabbed example from TSX to CSS
export default async (film) => {
  await film.click({ role: "button", name: "styles.css" }, { hold: 1600 });
  film.mark("hero");
  await film.click({ role: "button", name: "counter.tsx" }, { hold: 1200 });
};
