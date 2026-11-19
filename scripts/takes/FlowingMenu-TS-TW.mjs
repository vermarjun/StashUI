// glide across the flowing menu rows so each reveals its image marquee
export default async (film) => {
  await film.hover({ text: "Home" }, { hold: 1400 });
  await film.hover({ text: "Work" }, { hold: 1400 });
  await film.mark("hero");
  await film.hover({ text: "About" }, { hold: 1400 });
};
