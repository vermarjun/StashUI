// Highlight — glide along the nav so the shared highlight pill slides behind each hovered item
export default async (film) => {
  await film.hover({ role: "button", name: "Overview" }, { hold: 700 });
  await film.hover({ role: "button", name: "Customers" }, { hold: 700 });
  film.mark("hero");
  await film.hover({ role: "button", name: "Settings" }, { hold: 700 });
  await film.hover({ role: "button", name: "Analytics" }, { hold: 800 });
};
