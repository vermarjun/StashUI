// scripts/takes/components-backgrounds-bubble.mjs — bubbles lean toward the cursor as it wanders
export default async (film) => {
  film.mark("hero");
  await film.drift({ secs: 4.8, rx: film.W * 0.27, ry: film.H * 0.23 });
};
