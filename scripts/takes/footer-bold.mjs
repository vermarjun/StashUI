// bold footer: hover the email CTA, then the social links and back-to-top
export default async (film) => {
  await film.hover({ role: "link", name: /hello@example\.com/i }, { hold: 1400 });
  await film.mark("hero");
  await film.hover({ role: "link", name: /linkedin/i }, { hold: 1000 });
  await film.hover({ role: "button", name: /back to top/i }, { hold: 1200 });
};
