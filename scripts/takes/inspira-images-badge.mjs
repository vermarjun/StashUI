// inspira-images-badge — hover each badge so its photo stack fans out.
export default async (film) => {
  await film.hover({ text: "3 photos" }, { hold: 1200 });
  await film.hover({ text: "View gallery" }, { hold: 1200 });
  film.mark("hero");
  await film.hover({ text: "Large thumbnails" }, { hold: 1300 });
};
