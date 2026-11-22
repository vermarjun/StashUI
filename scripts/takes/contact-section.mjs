// contact-section: the whole card fits the stage; fill in the form like a visitor would
export default async (film) => {
  await film.type("[data-rec-root] #first-name", "Maya");
  await film.type("[data-rec-root] #email", "maya@northwind.studio");
  await film.type("[data-rec-root] #message", "Loved the launch. Can we talk about a partnership?", { delay: 30 });
  film.mark("hero");
  await film.hover({ role: "button", name: "Submit" }, { hold: 1000 });
};
