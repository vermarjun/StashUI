// Proximity spotlight + cursor-flow gradient follow the cursor across the cards.
export default async (film) => {
  await film.drift({ secs: 4.6, cy: film.H * 0.48, ry: film.H * 0.26 });
};
