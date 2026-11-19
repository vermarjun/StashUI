// inspira-file-tree — expanding the lib folder and selecting utils.ts
export default async (film) => {
  await film.click({ text: "lib" }, { hold: 1400 });
  film.mark("hero");
  await film.click({ text: "utils.ts" }, { hold: 1400 });
};
