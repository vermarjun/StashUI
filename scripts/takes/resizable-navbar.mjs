// resizable-navbar — scroll the page so the full-width bar shrinks into a floating pill, hover a link, then scroll back to the top.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.5 });
  await film.scroll(420, { secs: 1.3 });
  await film.hover({ text: "Pricing" }, { hold: 1300 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.5 });
  await film.scroll(-420, { secs: 1.3 });
  await film.hold(900);
};
