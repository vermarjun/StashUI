// settings-page — flip a notification switch, pick a theme, then scroll to the danger zone
export default async (film) => {
  await film.click("#billing-alerts", { hold: 900 });
  await film.click({ role: "radio", name: /dark/i }, { hold: 1000 });
  film.mark("hero");
  await film.scroll(420, { secs: 1.4 });
  await film.hold(700);
};
