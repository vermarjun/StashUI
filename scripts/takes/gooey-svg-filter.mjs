// gooey-svg-filter — switch tabs so the active blob melts across into the next one
export default async (film) => {
  await film.click({ text: "2025" }, { hold: 1100 });
  film.mark("hero");
  await film.click({ text: "2023" }, { hold: 1200 });
  await film.click({ text: "2026" }, { hold: 1100 });
};
