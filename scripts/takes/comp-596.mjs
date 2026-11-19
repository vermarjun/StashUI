// status header: power the service off with the animated switch, back on
export default async (film) => {
  await film.hover({ text: "Online", exact: true }, { hold: 600 });
  await film.click("[role=switch]", { hold: 1500 });
  await film.mark("hero");
  await film.click("[role=switch]", { hold: 1500 });
};
