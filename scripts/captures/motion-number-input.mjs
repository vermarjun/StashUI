/**
 * Capture choreography for motion-number-input
 *
 * The component renders a stepper: [−] animated-number [+].
 * Clicking + or − increments/decrements with a rolling NumberFlow animation.
 * Strategy: click + several times, pause, click − a couple of times so the
 * digit rolls both up and down, ending at a non-zero value.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    // Let NumberFlow initialise
    try { await wait(400); } catch (_) {}

    // Click the + button 4 times (number rolls up: 0→1→2→3→4)
    for (let i = 0; i < 4; i++) {
      try {
        // The + button is the last button in the stepper row
        await page.getByRole('button').last().click({ force: true });
      } catch (_) {}
      try { await wait(550); } catch (_) {}
    }

    try { await wait(400); } catch (_) {}

    // Click − twice (4→3→2) so the downward roll is visible
    for (let i = 0; i < 2; i++) {
      try {
        await page.getByRole('button').first().click({ force: true });
      } catch (_) {}
      try { await wait(550); } catch (_) {}
    }

    try { await wait(400); } catch (_) {}

    // Click + once more to end on 3 — visible non-zero state
    try {
      await page.getByRole('button').last().click({ force: true });
    } catch (_) {}
    try { await wait(600); } catch (_) {}
  } catch (err) {
    console.error('motion-number-input capture error:', err);
  }
}
