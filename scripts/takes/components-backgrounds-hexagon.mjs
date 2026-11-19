// scripts/takes/components-backgrounds-hexagon.mjs — hexagons light up under the cursor
export default async (film) => {
  film.mark("hero");
  await film.drift({ secs: 4.8, rx: film.W * 0.3, ry: film.H * 0.24 });
};
