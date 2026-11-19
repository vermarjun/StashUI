// press the down arrow twice to slide vertically through the gallery
export default async (film) => {
  const next = "button:has(svg.lucide-chevron-down)";
  await film.click(next, { hold: 1400 });
  film.mark("hero");
  await film.click(next, { hold: 1500 });
};
