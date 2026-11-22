// Dashboard 01: switch the chart range, then scroll down into the sortable data table
export default async (film) => {
  await film.click({ text: "Last 30 days" }, { hold: 1100 });
  film.mark("hero");
  await film.click({ text: "Last 7 days" }, { hold: 1000 });
  await film.scroll(520, { secs: 1.6 });
  await film.hold(700);
  await film.scroll(-520, { secs: 1.2 });
};
