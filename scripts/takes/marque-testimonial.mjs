// slow testimonial marquee: glide across the cards, push in to show the drift
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "Sarah Drasner" }, { hold: 1400 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.2 }, { secs: 0.8 });
  await film.hold(1600);
};
