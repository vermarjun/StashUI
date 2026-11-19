// open the scrollable dialog and scroll its content
export default async (film) => {
  await film.hover({ role: "button", name: /Scrollable \(native scrollbar\)/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Scrollable \(native scrollbar\)/ }, { hold: 1200 });
  await film.glide({ x: film.W / 2, y: film.H * 0.55 }, { secs: 0.4 });
  await film.mark("hero");
  await film.scroll(900, { secs: 1.8, hold: 300 });
  await film.press("Escape", { hold: 400 });
};
