// reports header: open the date range calendar, pick a day, then the filters
export default async (film) => {
  await film.click({ role: "button", name: /date/i }, { hold: 1000 });
  await film.mark("hero");
  await film.click({ text: "18", exact: true }, { hold: 700 });
  await film.press("Escape", { hold: 500 });
  await film.click({ role: "button", name: /filters/i }, { hold: 900 });
  await film.click({ text: "Real Time", exact: true }, { hold: 1200 });
};
