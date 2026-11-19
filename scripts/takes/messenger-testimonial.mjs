// messenger-testimonial — messages stream in; a click lands a reaction on one
export default async (film) => {
  await film.hold(2200);
  await film.click({ text: "Just integrated the new grid system. Incredible work!" }, { hold: 1500 });
  await film.mark("hero");
  await film.scroll(200, { secs: 1.2, hold: 600 });
};
