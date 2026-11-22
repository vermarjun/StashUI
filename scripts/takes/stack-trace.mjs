// Stack trace: collapse and re-expand the frames, hover an app frame
export default async (film) => {
  await film.click({ text: "Cannot read properties" }, { hold: 1000 });
  await film.click({ text: "Cannot read properties" }, { hold: 1200 });
  film.mark("hero");
  await film.hover({ text: "calculateTotals" }, { hold: 900 });
};
