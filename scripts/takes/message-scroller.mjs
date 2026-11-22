// Message scroller: the reply streams in and stays pinned; scroll up, then jump back with the button
export default async (film) => {
  await film.glide({ text: /Alfama/ }, { secs: 0.7 });
  await film.hold(2200);
  film.mark("hero");
  await film.scroll(-500, { secs: 1.2 });
  await film.hold(600);
  await film.click({ role: "button", name: "Scroll to end" }, { hold: 1200 });
};
