// let the testimonials stream past, hover one to pause the marquee, then let it run again
export default async (film) => {
  await film.hold(1600);
  film.mark("hero");
  await film.hover({ x: film.W * 0.5, y: film.H * 0.5 }, { hold: 1500 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.12 }, { secs: 0.7 });
  await film.hold(1600);
};
