// Tour: start it, step through two highlights with the spotlight moving between them
export default async (film) => {
  await film.click({ role: "button", name: "Start Tour" }, { hold: 1500 });
  await film.click({ role: "button", name: /next/i }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: /next/i }, { hold: 1500 });
};
