// Halo card: hover the card rim, then the gradient primary button
export default async (film) => {
  await film.hover({ text: "Invite your team" }, { hold: 1200 });
  await film.hover({ role: "button", name: /send invites/i }, { hold: 1500 });
  film.mark("hero");
};
