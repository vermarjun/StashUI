// Management bar: page forward twice (sliding digits), then hover actions so their labels spring open
export default async (film) => {
  const next = "[data-rec-root] button:has(svg.lucide-chevron-right)";
  await film.click(next, { hold: 600 });
  await film.click(next, { hold: 700 });
  await film.hover({ role: "button", name: "Reject" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ role: "button", name: "Hire" }, { hold: 1200 });
};
