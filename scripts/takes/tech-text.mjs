// Tech Text: letters turn into dashed vector outlines under the cursor
export default async (film) => {
  const y = film.H * 0.5;
  await film.glide({ x: film.W * 0.22, y }, { secs: 0.8 });
  await film.glide({ x: film.W * 0.55, y }, { secs: 1.6 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.8, y: y + 20 }, { secs: 1.2 });
  await film.hold(600);
};
