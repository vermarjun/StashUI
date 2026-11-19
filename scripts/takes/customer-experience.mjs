// Experience list: glide down the rows; each one floats its photo under the cursor
export default async (film) => {
  await film.hover({ text: "City Photography" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ text: "Outdoor Photography" }, { hold: 1100 });
  await film.hover({ text: "Creative Photography" }, { hold: 1100 });
  await film.hover({ text: "Style Photography" }, { hold: 1000 });
  await film.glide({ text: "EXPERIENCE" }, { secs: 0.8 });
};
