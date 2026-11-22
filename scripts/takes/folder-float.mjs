// FolderFloat: hover the folder so the notes float out, then pick one
export default async (film) => {
  await film.hover("[data-rec-root] [data-trigger]", { hold: 1600 });
  film.mark("hero");
  await film.click({ text: "Logo feels small" }, { hold: 1200 });
};
