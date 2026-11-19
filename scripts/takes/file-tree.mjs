// file-tree — expanding the pages folder and selecting a file inside
export default async (film) => {
  await film.click({ text: "pages" }, { hold: 1400 });
  film.mark("hero");
  await film.click({ text: "about.tsx" }, { hold: 1400 });
};
