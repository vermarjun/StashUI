// click the next arrow twice so the scaled slide transition plays
export default async (film) => {
  const next = "button:has(svg.lucide-chevron-right)";
  await film.click(next, { hold: 1300 });
  film.mark("hero");
  await film.click(next, { hold: 1400 });
};
