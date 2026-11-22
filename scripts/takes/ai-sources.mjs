// AI sources: open the favicon stack so each icon flies into its own source row, then collapse
export default async (film) => {
  await film.click({ role: "button", name: /sources/i }, { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "How rocks could split seawater" }, { hold: 900 });
  await film.click({ role: "button", name: /sources/i }, { hold: 900 });
};
