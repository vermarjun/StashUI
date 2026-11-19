// Character limit input: type a real release note and watch the counter fill
export default async (film) => {
  await film.type("input", "The release notes look great — ship it Friday.", { hold: 1400 });
};
