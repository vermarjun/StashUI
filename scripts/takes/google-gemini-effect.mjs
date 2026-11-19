// google-gemini-effect — scroll so the five glowing paths draw in from both sides and converge on the button
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(450, { secs: 1.8, hold: 300 });
  await film.scroll(450, { secs: 1.8, hold: 300 });
  film.mark("hero");
  await film.scroll(400, { secs: 1.6, hold: 700 });
};
