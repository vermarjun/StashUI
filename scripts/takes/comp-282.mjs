// toast alert: inspect the message and hover the dismiss button
export default async (film) => {
  await film.hover({ role: "button", name: /close notification/i }, { hold: 1600 });
  await film.mark("hero");
  await film.hover({ text: "Just a quick note!", exact: true }, { hold: 1300 });
};
