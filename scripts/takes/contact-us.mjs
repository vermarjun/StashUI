// contact section: fill the form and send it, the button flips to "Message Sent!"
export default async (film) => {
  await film.type("#name", "Maya Chen");
  await film.type("#email", "maya@halcyon.dev");
  await film.type("#message", "Loved the demo. Can we talk pricing for a team of 12?", { delay: 22 });
  await film.click({ role: "button", name: /send message/i }, { hold: 1600 });
  film.mark("hero");
};
