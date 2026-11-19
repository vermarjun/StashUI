// testimonial-basic: hover the first video so its play button pops, then scroll down to the next testimonial
export default async (film) => {
  await film.hover(film.page.getByAltText("Testimonial Video 0"), { hold: 1300 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.7, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(420, { secs: 1.6 });
  await film.hover(film.page.getByAltText("Testimonial Video 1"), { hold: 1200 });
};
