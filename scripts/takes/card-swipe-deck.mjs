// Card swipe deck: drag the top card off to the right (stamp + throw), then skip the next with the button
export default async (film) => {
  const deck = await film.page.getByRole("application", { name: /swipeable card deck/i }).boundingBox();
  const cx = deck.x + deck.width / 2;
  const cy = deck.y + deck.height / 2;
  await film.glide({ x: cx, y: cy }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: cx + 120, y: cy - 10 }, { secs: 0.7 });
  film.mark("hero");
  await film.glide({ x: cx + 260, y: cy - 20 }, { secs: 0.4 });
  await film.page.mouse.up();
  await film.hold(800);
  await film.click({ role: "button", name: /^skip$/i }, { hold: 1100 });
};
