// Key-value editor: add a row and fill in a new environment variable
export default async (film) => {
  await film.click({ role: "button", name: "Add" }, { hold: 600 });
  await film.type(null, "STRIPE_SECRET_KEY", { delay: 40 });
  await film.type("[data-rec-root] [data-slot=key-value-value-input] >> nth=-1", "sk_live_51Hc9kT2", { delay: 40 });
  film.mark("hero");
  await film.hold(900);
};
