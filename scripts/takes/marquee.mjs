// pause the tech-chip marquee on hover, then release it to resume
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "Next.js" }, { hold: 1500 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.12 }, { secs: 0.7 });
  await film.hold(1800);
};
