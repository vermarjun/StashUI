# Describing a component: the contract

You are writing the permanent record of a UI component. You are given its
recorded frames, its source code and facts measured from its clip. Your record
is the only description of this component that will ever be written: the
gallery shows it to people, search matches against it, and coding agents choose
and install components by reading it. Nobody checks it against the component
again, so it has to be right.

Two readers. A **person** scanning a gallery of 1,100 components, who reads one
line and decides whether to look closer. A **coding agent** that cannot see the
component at all and decides from your words whether it fits the page it is
building, and what adopting it will cost.

## What you are given, per component

- `<name>.jpg`: frames from the recorded clip, numbered 1 to 6 in a yellow
  badge, in time order. **Open and look at this image before writing anything.**
  Everything you say about how the component looks must come from it. If your
  tools cannot show you the image, stop and report that; never describe a
  component's look from its code alone.
- `<name>.md`: the title, the catalogue description (written by whoever
  imported it; often incomplete, sometimes wrong), facts measured from the clip,
  the demo that was recorded, and the source code.

When the frames and the code disagree about what is visible, the frames win and
the disagreement goes in `issues`. For how it works (triggers, props, states,
accessibility), the code wins.

## Output

One JSON object per component, exactly these keys, nothing extra, no comments.

```json
{
  "name": "task-pill",
  "frames": {
    "code": "4821",
    "best": 6,
    "best_why": "Island is expanded with both finished jobs and their actions; frame 1 shows no island at all.",
    "usable": [2, 3, 4, 5, 6],
    "render": "ok",
    "render_note": "",
    "shows_interaction": "yes"
  },
  "tagline": "Pill at the screen edge reports running jobs and opens into a progress list.",
  "summary": "A floating pill appears when a background task starts, shows its progress, and expands on hover into a list of every job with percentages. Finished jobs get a tick and an action button.",
  "title_fix": null,
  "appearance": "A small dark rounded pill near the bottom of the stage holding a spinner, a job label and a percentage. Expanded, it becomes a taller rounded panel with one row per job, each ending in a percentage or a small outlined button.",
  "behaviour": "Hidden until a job starts, then fades in as a pill. Hovering it grows the pill into the full list with a spring. Rows swap the spinner for a green tick when a job completes.",
  "parts": ["pill", "spinner", "job label", "percentage", "job list", "row action button"],
  "demo_content": "Four trigger buttons (Upload photos, Export report, Archive thread, Sync calendar) start fake jobs.",
  "states": ["hover", "loading", "success", "expanded"],
  "kind": "toast",
  "look": ["dark", "pill", "minimal", "rounded"],
  "tone": "minimal",
  "search_phrases": [
    "dynamic island style progress indicator",
    "background task status pill",
    "upload progress floating at bottom of screen",
    "list of running jobs with percentages",
    "export in progress notification",
    "ios style activity pill for web app",
    "show several uploads finishing at once",
    "non blocking progress toast"
  ],
  "resembles": ["iOS Dynamic Island"],
  "use_when": "Long-running work (uploads, exports, syncs) should stay visible without blocking the page.",
  "avoid_when": "A single short action: a plain toast is lighter and needs no hover to read.",
  "suits": ["saas", "dashboard"],
  "slot_hints": ["toast", "loading"],
  "traits": {
    "trigger": ["click", "hover"],
    "motion": "subtle",
    "affects": ["layout", "children"],
    "theme": "dark",
    "needs_sized_parent": false
  },
  "content_from": "props",
  "customise": "Jobs come in as a prop array with label, progress and status. Position, colours and the spring are in the source.",
  "technique": ["motion-library"],
  "weight": "light",
  "weight_why": "A few DOM nodes and one layout animation; idle when no job runs.",
  "responsive": "fluid",
  "a11y": {
    "keyboard": "partial",
    "focus_visible": "yes",
    "labels": "partial",
    "reduced_motion": false,
    "note": "Expands on hover only, so keyboard users cannot open the list. Progress is not announced to screen readers."
  },
  "props": [
    {"name": "jobs", "type": "Job[]", "default": null, "required": true},
    {"name": "className", "type": "string", "default": null, "required": false}
  ],
  "issues": [],
  "polish": 4,
  "polish_why": "Clean spacing and a believable motion story; small text is low contrast on the dark pill.",
  "unsure": []
}
```

That example is illustrative. Never copy its wording into another record.

## Fields

### frames: look first

- **`code`**: the four-digit sheet code printed in yellow at the bottom right of
  the image, as a string. It is checked against the image. `null` only when the
  packet says no image exists.
- **`best`**: the number of the ONE frame that should be this component's
  poster, the single still a stranger sees in a grid. Pick the frame where the
  component is fully visible and in the state that makes it recognisable as
  what it is: a menu open, an effect at its peak, a chart drawn, a toggle
  switched on, a form filled in. For a loader or skeleton that is the loading
  state, not the content that replaces it. Reject frames that are
  empty or idle when idle shows nothing, mid-transition blurs, frames where the
  component is cut off, and frames where the cursor hides the important part.
  If several are equally good, take the one with the most to see. `null` only
  when no frame shows the component.
- **`best_why`**: one sentence naming what that frame shows that the others do
  not. At most 120 characters.
- **`usable`**: every frame number in which the component is clearly visible and
  recognisable. Empty list if none.
- **`render`**: `ok` the component is visible and looks intended. `partial` it
  is cut off, tiny, or only part of it rendered. `blank` the frames show an
  empty stage. `broken` it shows an error, unstyled markup, a missing image, or
  something clearly not intended.
- **`render_note`**: what is wrong, at most 120 characters. Empty string when `ok`.
- **`shows_interaction`**: `yes` the frames show its key interaction or
  animation happening. `partly` some of it. `no` the frames never show the thing
  it exists to do. `static` it has no interaction or animation to show.

### For people

- **`tagline`**: at most 80 characters. What it LOOKS LIKE or DOES on screen, as
  you would say it aloud to someone who cannot see it. This is the one line that
  separates it from 90 siblings.
  - Lead with the verb or the visual, not the noun.
  - Never restate the title. For "Magnetic Button", never "A magnetic button".
  - Never name the source library. Never write "a component that" or "this component".
  - Good: `Leans toward the cursor, springs back on release.`
  - Good: `Three lines fold into an X when clicked.`
  - Bad: `A button component with a magnetic hover animation.`
  - Bad: `An animated button.`
- **`summary`**: one or two sentences, at most 240 characters. What it is and
  what it does, for someone deciding whether to open it. Plain words, no code
  terms, no library names.
- **`title_fix`**: `null` unless the given title is vague, misleading or a code
  name (for example "Comp 293" or "Demo"). Then a clear title of at most 40
  characters, in Title Case, saying what the thing is.

### What is seen

Describe, do not sell. No "beautiful", "sleek", "modern", "stunning", "elegant".

- **`appearance`**: one to three sentences, at most 320 characters, on what is on
  screen at rest in the frames: shapes, layout, surface, colour, proportions.
  Someone should be able to sketch it from this.
- **`behaviour`**: one to three sentences, at most 320 characters, on what
  changes over time, what triggers it, and how it settles. For a static
  component say what the user can do with it, or "Static: nothing moves or
  responds." if nothing.
- **`parts`**: 2 to 8 plain nouns for the visible parts, each at most 30
  characters, in reading order. "search input", "result row", "avatar stack".
  No adjectives, no code names.
- **`demo_content`**: at most 120 characters. The placeholder content this demo
  happens to show (a forest photo, the heading "Make things float", fake user
  names). This is kept out of search so that a card showing a forest photo does
  not match "forest". Empty string if there is none.
- **`states`**: the states this component really has, seen in the frames or
  implemented in the code. Only from:
  `hover focus active disabled loading empty error success open selected checked expanded dragging`.
  Empty list for a passive effect.

### What it is

- **`kind`**: exactly one id from the kinds list at the end. Decide from the
  frames first, the code second. Ask: if someone were building a page, what
  would they be looking for when this is the right answer?
  - A navigation bar is `site-header` even when it contains dropdowns.
  - A full-width page section and a small part are different kinds: a pricing
    page is `pricing-section`; one plan card or a billing toggle is `pricing-card`.
  - A demo that wraps one control in a card is still that control.
  - An animated or shader backdrop is `background` even if the demo puts a
    headline on it. It is a `hero` only when headline, copy and call to action
    are part of the component itself.
  - When the component IS an effect or a technique and the demo merely applies
    it to something (a filter shown on tabs, a border glow shown on a card),
    the kind is the effect, not the thing it was shown on.
  - `other` only when nothing fits.
- **`look`**: 3 to 5 words for what you see in the frames, only from:
  `flat outlined glass gradient neon glow shadowed textured 3d skeuomorphic monochrome colorful pastel dark light rounded sharp pill minimal dense airy bold playful technical editorial luxurious brutalist retro futuristic organic corporate`
- **`tone`**: one of `minimal decorative playful technical dramatic`.

### For finding and choosing

- **`search_phrases`**: exactly 8 phrases that different people would type into
  a search box when they want this and do not know its name. Lower case, 2 to 9
  words each. The 8 must differ from each other in vocabulary, and together cover:
  - what it looks like, in everyday words ("three lines that turn into an x")
  - the job it does in a product ("ask visitors to accept cookies")
  - nicknames and industry slang for the pattern ("cmd k menu", "skeleton
    loader", "hamburger menu", "kebab menu", "bento grid", "toast")
  - how a non-designer would ask ("box that pops up when i hover")
  - a comparison to a well-known product, only when it truly applies ("airbnb
    style date picker")

  Never use the component's name or the library's name. Never describe the demo's
  placeholder content. Be faithful: never promise a feature it does not have.
- **`resembles`**: 0 to 3 real, named products whose version of this pattern
  people know ("macOS Spotlight", "Stripe gradient mesh", "iOS Dynamic Island",
  "Airbnb date picker"), each at most 40 characters. It must name a product,
  app or brand. A description of the pattern ("newsletter signup modal",
  "rotating word hero", "northern lights") does not belong here. Most
  components resemble nothing in particular: return `[]` for them.
- **`use_when`**: at most 120 characters. The concrete situation where this is
  the right pick over a plainer alternative.
- **`avoid_when`**: at most 120 characters. A real limitation you can see: touch
  devices, contrast, layout cost, an animation loop that never idles, a required
  parent size, a fixed colour that fights a theme, hardcoded content. Never
  "when you don't need animation": that is true of everything.
- **`suits`**: 1 to 3 product types it fits best, only from:
  `saas dashboard marketing ecommerce fintech portfolio docs blog ai-chat social media devtool mobile-app any`.
  Use `any` alone for general-purpose controls such as a plain checkbox.
- **`slot_hints`**: 1 to 4 places on a page it goes, only from:
  `page-background section-background hero headline body-text primary-cta secondary-cta nav sidebar footer feature-card pricing-card testimonial logo-wall stat form-field form-submit modal toast tooltip badge avatar media data-table list-item loading empty-state decoration divider chart`
- **`traits`**: fixed word lists.
  - `trigger`: 1 to 3 of `always hover click focus scroll viewport pointer-move drag timer keyboard`. `always` means it runs unprompted.
  - `motion`: one of `none subtle pronounced continuous`. `continuous` never settles.
  - `affects`: 1 to 3 of `fill border text shadow background layout cursor children image`. What visibly changes.
  - `theme`: `light`, `dark` or `both`. `both` unless the code hardcodes colours for one.
  - `needs_sized_parent`: `true` when the root is absolute, fixed, a canvas or
    WebGL and collapses to zero height without a sized parent. Check the code.

### What it costs to adopt: read the code

- **`content_from`**: how a developer puts their own content in. One of:
  `props` (text and data are passed as props), `children` (it wraps what you
  give it), `data-array` (it maps over an array prop of items), `hardcoded`
  (the copy and images are written inside the component, so you must edit the
  file), `none` (a pure effect with no content, such as a background).
- **`customise`**: one or two sentences, at most 200 characters. What can be
  changed through props, and what needs a source edit.
- **`technique`**: 1 to 3 of
  `static css-transition css-keyframes svg svg-filter canvas-2d webgl-shader three-js motion-library gsap js-animation`.
  `motion-library` is framer-motion / motion. `js-animation` is hand-written
  requestAnimationFrame or the Web Animations API. `static` alone when nothing animates.
- **`weight`**: `light`, `moderate` or `heavy` at runtime. Heavy is a WebGL or
  canvas loop every frame, a 3D scene, or hundreds of animated nodes.
- **`weight_why`**: the reason in at most 100 characters.
- **`responsive`**: `fluid` (fills its container), `breakpoints` (the code has
  responsive classes or media queries), `fixed-width` (hardcoded pixel width),
  `unknown`.
- **`a11y`**: what the code does, not what it should do.
  - `keyboard`: `yes` every action works from the keyboard, `partial`, `no`, or
    `n-a` for something with nothing to operate.
  - `focus_visible`: `yes`, `no`, or `n-a`.
  - `labels`: `good`, `partial`, `none` (aria labels, roles, alt text), or `n-a`.
  - `reduced_motion`: `true` only if the code checks `prefers-reduced-motion`
    or a reduced-motion hook.
  - `note`: one or two sentences, at most 160 characters, on the gap that
    matters most.
- **`props`**: up to 12 props the component accepts, most useful first. Exact
  spelling from the code; every name is checked against the source and an
  invented one is discarded. `default` comes from the destructured parameter
  list of the component function (not the type block), as a string, or `null`
  if there is none. `required` is `true` only when it cannot work without it.
  `[]` if it takes no props.

### Honest assessment

- **`issues`**: 0 to 4 defects you can see in the frames or prove from the code,
  each at most 120 characters: clipped text, overflow, unreadable contrast,
  misalignment, a demo that does not show the component, frames that disagree
  with the code. Empty list when there are none. Do not invent problems.
- **`polish`**: 1 to 5, judged from the frames. Be strict; use the whole range.
  5: could ship in a top-tier product as it is. Rare.
  4: distinctive and well made, with at most a small flaw.
  3: competent but ordinary, such as a standard control with default styling.
     This is the most common score.
  2: rough: poor spacing, weak contrast, a clumsy animation, a thin demo.
  1: broken, blank or unfinished.
- **`polish_why`**: the reason in at most 100 characters.
- **`unsure`**: names of the fields you had to guess. Empty list when confident.
  Listing a field here is better than a confident wrong answer.

## Kinds

`id (how much of a page it occupies)`: words people use for it.

- `site-header` (section): navbar, nav bar, header, top nav, navigation bar, mega menu, site nav
- `hero` (section): hero section, landing hero, above the fold, headline section
- `feature-section` (section): features, feature grid, bento, bento grid, benefits, how it works
- `pricing-section` (section): pricing, pricing table, plans, tiers
- `testimonial-section` (section): testimonials, reviews, social proof, quotes, wall of love
- `cta-section` (section): call to action, cta, banner, signup banner, waitlist
- `footer` (section): site footer, page footer
- `logo-cloud` (section): logos, trusted by, brand wall, logo wall, integrations grid
- `stats-section` (section): stats, metrics, numbers, kpis
- `faq-section` (section): faq, questions
- `team-section` (section): team, people, about us
- `contact-section` (section): contact, contact form, get in touch
- `gallery-section` (section): gallery, portfolio, showcase, image grid, case studies, projects
- `content-section` (section): about, story, blog, article, editorial section
- `dashboard` (section): admin, analytics screen, app screen, overview page
- `sidebar` (block): side nav, side navigation, app sidebar, docs nav, tree nav
- `auth-form` (block): login, login form, sign in, sign in form, sign up, sign up form, register, otp screen, two factor
- `settings-panel` (block): settings, preferences, account page, profile form
- `onboarding` (block): tour, wizard, welcome flow, getting started, checklist
- `chat` (block): ai chat, messages, prompt box, chat input, assistant, conversation
- `command-menu` (block): command palette, cmdk, spotlight, quick actions
- `data-table` (block): table, grid, spreadsheet, list view
- `calendar` (block): date picker, scheduler, date range, time picker
- `file-upload` (block): dropzone, uploader, attachment
- `checkout` (block): payment form, card form, billing, cart, order summary
- `form` (block): multi field form, survey, questionnaire, newsletter form
- `search` (block): search bar, search box, filter bar, query builder
- `editor` (block): rich text, text editor, markdown editor, toolbar editor
- `media-player` (block): audio player, video player, music, podcast, waveform
- `chart` (block): graph, sparkline, data viz, gauge, heatmap
- `map` (block): world map, location, location picker, pin map
- `code-block` (block): code, terminal, snippet, diff, console
- `timeline` (block): activity feed, changelog, history, roadmap
- `list` (block): animated list, feed, transaction list, stack, sortable list, tree
- `card` (block): tile, panel, feature card, info card, profile card
- `pricing-card` (block): plan card, plan picker, billing toggle, tier card
- `stat-card` (block): metric card, kpi card, number widget, widget
- `product-card` (block): ecommerce card, shop item, product tile
- `testimonial-card` (block): quote card, review card, tweet card
- `empty-state` (block): no results, blank slate, error page, 404
- `carousel` (block): slider, slideshow, gallery carousel, stories
- `marquee` (block): ticker, scrolling strip, infinite scroll row
- `device-mockup` (block): phone frame, browser frame, laptop mockup, safari
- `button` (element): cta button, btn, action, link button, button group
- `input` (element): text field, textarea, otp input, phone input, number input, tag input, password field
- `select` (element): combobox, dropdown select, multi select, picker, autocomplete
- `checkbox` (element): check, checklist item, todo check
- `radio-group` (element): radio, choice cards, segmented choice
- `switch` (element): toggle, theme toggle, on off
- `slider` (element): range, scrubber, knob, dial, volume
- `tabs` (element): tab bar, segmented control, pill tabs, toggle group
- `accordion` (element): collapsible, disclosure, expandable
- `modal` (element): dialog, alert dialog, confirm, lightbox, popup
- `drawer` (element): sheet, bottom sheet, side panel
- `popover` (element): hover card, floating panel, flyout
- `tooltip` (element): hint, hover label
- `dropdown-menu` (element): menu, context menu, action menu, user menu
- `toast` (element): notification, alert, snackbar, banner alert, status island
- `badge` (element): tag, chip, pill, label, status dot
- `avatar` (element): avatar group, user picture, profile image
- `loader` (element): spinner, loading, skeleton, progress bar, shimmer
- `pagination` (element): pager, page numbers, breadcrumb
- `stepper` (element): steps, progress steps, wizard steps
- `dock` (element): tab bar mobile, bottom navigation, floating toolbar, toolbar, speed dial
- `counter` (element): animated number, number ticker, countdown, clock, timer
- `icon` (element): animated icon, logo, illustration, emoji
- `background` (effect): animated background, shader, gradient background, grid background, particles, aurora, noise
- `text-effect` (effect): animated text, text animation, typewriter, text reveal, headline effect, kinetic type
- `image-effect` (effect): image hover, image reveal, photo effect, video effect, distortion, media gallery
- `cursor-effect` (effect): custom cursor, cursor trail, pointer follower, magnetic
- `scroll-effect` (effect): parallax, scroll reveal, scroll animation, sticky scroll, scroll progress
- `border-effect` (effect): glow, border beam, spotlight, shine, outline animation
- `transition` (effect): page transition, layout animation, morph, shared element, reveal wrapper
- `3d-scene` (effect): 3d, webgl, three, model viewer, 3d card, globe
- `other` (block): -
