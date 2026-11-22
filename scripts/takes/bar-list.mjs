// bar-list — switch datasets so the bars re-rank and animate their widths
export default async (film) => {
  await film.click({ role: "button", name: "Referrers" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Countries" }, { hold: 1300 });
  await film.click({ role: "button", name: "Pages" }, { hold: 900 });
};
