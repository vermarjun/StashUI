// Sandbox: start on the code, switch to the live preview, then the console
export default async (film) => {
  await film.hold(800);
  await film.click({ role: "tab", name: /preview/i }, { hold: 2200 });
  film.mark("hero");
  await film.click({ role: "tab", name: /console/i }, { hold: 1200 });
};
