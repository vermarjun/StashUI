// Inline testimonials: hover two names in the paragraph so their quote cards pop open
export default async (film) => {
  await film.hover({ role: "button", name: /Sofia Alvarez/ }, { hold: 1500 });
  film.mark("hero");
  await film.hover({ role: "button", name: /Daniel Okafor/ }, { hold: 1500 });
};
