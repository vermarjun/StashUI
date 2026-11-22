// Fey cards: hover along the stack's exposed edges so cards fan apart and the headline goes gradient
export default async (film) => {
  const cards = film.page.locator("[data-rec-root] .group");
  const edge = async (i) => {
    const b = await cards.nth(i).boundingBox();
    return { x: b.x + 16, y: b.y + b.height * 0.45 };
  };
  await film.hover(await edge(0), { hold: 1000 });
  await film.hover(await edge(2), { hold: 1200 });
  film.mark("hero");
  await film.hover(await edge(3), { hold: 900 });
  await film.glide({ x: film.W * 0.85, y: film.H * 0.5 });
  await film.hold(700);
};
