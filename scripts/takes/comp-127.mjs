// directional pad: pan up, right and down so the control reads as a camera pad
export default async (film) => {
  await film.click({ role: "button", name: /Pan camera up/i }, { hold: 900 });
  await film.click({ role: "button", name: /Pan camera right/i }, { hold: 900 });
  film.mark("hero");
  await film.click({ role: "button", name: /Pan camera down/i }, { hold: 1200 });
};
