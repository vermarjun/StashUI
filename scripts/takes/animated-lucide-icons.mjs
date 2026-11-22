// Animated icons: hover across a few tiles so each icon plays its animation
export default async (film) => {
  await film.hover('[data-icon="bell"]', { hold: 1100 });
  await film.hover('[data-icon="heart"]', { hold: 1000 });
  film.mark("hero");
  await film.hover('[data-icon="settings"]', { hold: 1100 });
  await film.hover('[data-icon="send"]', { hold: 1000 });
};
