// click the next arrow twice through the looping gallery, dots follow along
export default async (film) => {
  const next = "button:has(svg.lucide-chevron-right)";
  await film.click(next, { hold: 1400 });
  film.mark("hero");
  await film.click(next, { hold: 1500 });
};
