// Undo button: archives, lets the outline countdown drain, then undoes
export default async (film) => {
  await film.click({ role: "button", name: /^archive$/i }, { hold: 300 });
  // move off the button so the countdown keeps draining
  await film.glide({ x: film.W * 0.5, y: film.H * 0.78 }, { secs: 0.6 });
  film.mark("hero");
  await film.hold(1800);
  await film.click({ role: "button", name: /undo/i }, { hold: 1200 });
};
