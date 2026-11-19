// hover replay of the letter-scramble reveal
export default async (film) => {
  await film.hover({ text: "HyperText Animation" }, { hold: 1800 });
  await film.glide({ x: film.W * 0.8, y: film.H * 0.2 }, { secs: 0.6 });
  film.mark("hero");
  await film.hover({ text: "HyperText Animation" }, { hold: 1400 });
};
