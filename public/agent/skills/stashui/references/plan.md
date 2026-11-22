# plan.json

Only when the user asks for a mockup or to approve picks first. It is what `{{CLI}} propose` turns into that page. Names are component names from search, browse or view.

```json
{
  "title": "Invoicing landing page",
  "direction": "Dark, calm, precise. One orange accent.",
  "tokens": { "background": "#0B0B0C", "foreground": "#F5F5F4", "primary": "#F97316" },
  "slots": [
    {
      "slot": "Header",
      "pick": "comp-578",
      "why": "Links plus sign-in and a primary button; takes the tokens untouched.",
      "alternatives": ["resizable-navbar", "comp-581"]
    },
    { "slot": "Pricing", "build": "No three-column table in the catalogue. Built from cards plus pricing-frequency-toggle.", "pick": "pricing-frequency-toggle" }
  ]
}
```

- One slot per thing the screen needs, in page order.
- `alternatives`: one or two runners-up that are a genuinely different option, not a near twin.
- `why`: one line a person can disagree with.
- `build`: say it when part of a slot is written by hand.
- Several directions to choose between: replace `slots` with `"directions": [{ "name", "idea", "tokens", "slots" }, …]`.
