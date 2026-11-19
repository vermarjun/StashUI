// team-synth — scroll to the network and hover a card so it lifts and colourises
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(220, { secs: 1.3 });
  await film.hover(film.page.getByAltText("Amélie Laurent").first(), { hold: 1500 });
  film.mark("hero");
  await film.hover(film.page.getByAltText("Sienna Hewitt").first(), { hold: 1300 });
};
