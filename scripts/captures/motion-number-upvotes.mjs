// Capture script for motion-number-upvotes
// Effect: clicking the up/down arrow buttons animates the NumberFlow counter
// and changes the card's colour (green for upvote, red for downvote).
// Choreography: upvote a few times → downvote → upvote once to end near neutral-ish state.

export default async function capture({ page, W, H }) {
  try {
    // Initial settle
    await page.waitForTimeout(500);

    // Upvote 3 times — number increments, card goes green
    for (let i = 0; i < 3; i++) {
      try {
        await page.getByRole('button').filter({ has: page.locator('svg') }).first().click();
      } catch (_) {}
      await page.waitForTimeout(600);
    }

    await page.waitForTimeout(500);

    // Downvote twice — card flips to red
    for (let i = 0; i < 2; i++) {
      try {
        await page.getByRole('button').filter({ has: page.locator('svg') }).last().click();
      } catch (_) {}
      await page.waitForTimeout(600);
    }

    await page.waitForTimeout(500);

    // Upvote once more — end on upvote green
    try {
      await page.getByRole('button').filter({ has: page.locator('svg') }).first().click();
    } catch (_) {}
    await page.waitForTimeout(700);
  } catch (err) {
    console.error('motion-number-upvotes capture error:', err);
  }
}
