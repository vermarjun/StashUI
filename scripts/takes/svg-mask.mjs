// svg-mask — moving the cursor over the text grows the reveal mask
export default async (film) => {
  await film.drift({ secs: 4.5, cx: film.W * 0.5, cy: film.H * 0.5, rx: film.W * 0.24, ry: film.H * 0.14 });
  await film.mark("hero");
};
