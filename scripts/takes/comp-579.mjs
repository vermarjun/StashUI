// minimal header: glide across the text nav links (underline on hover)
export default async (film) => {
  await film.hover({ role: "link", name: "Features" }, { hold: 900 });
  await film.hover({ role: "link", name: "Pricing" }, { hold: 1000 });
  await film.mark("hero");
  await film.hover({ role: "link", name: "About" }, { hold: 1200 });
};
