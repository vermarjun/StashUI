// tree — opens a folder, picks a file, then folds the folder away
export default async (film) => {
  await film.click({ text: "public" }, { hold: 1300 });
  await film.click({ text: "logo.svg" }, { hold: 1100 });
  await film.mark("hero");
  await film.click({ text: "components" }, { hold: 1200 });
};
