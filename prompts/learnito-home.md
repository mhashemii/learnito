# Learnito home page implementation prompt

## Goal

Replace the root route specimen with the Learnito home page shown in `design/learnito-home.png`.
Reproduce the reference composition, proportions, spacing, typography, borders, and quiet editorial tone at the supplied desktop size. Apply the already chosen brand decisions everywhere visible: the product is named Learnito and the action accent is teal. The reference still contains the old Vertex name and orange accent, so those source values are intentionally overridden.

## Skills and instructions read

- `AGENTS.md` for the product boundaries, UI fidelity rules, approval gate, and required checks.
- `.agents/skills/develop/SKILL.md` for the UI build flow and spec gate.
- `.agents/skills/develop/ui-guide.md` for the screen quality bar and responsive behavior.
- `.agents/skills/develop/ui/image.md` for screenshot based implementation and asset handling.
- `.agents/skills/develop/ui/implementation.md` for semantic structure, tokens, states, and visual self review.
- `.agents/skills/develop/checklist.md` for accessibility and token checks.
- `.agents/skills/develop/flow/build.md` for the build sequence.
- `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md` for App Router file conventions.
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` for the root page and layout contract.
- `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md` for internal navigation behavior.

## Code and design inspected

- `app/page.tsx` currently renders the design system specimen and must become the home screen.
- `app/layout.tsx` owns the root metadata and already uses local font fallbacks for reliable offline builds.
- `app/globals.css` owns the Learnito color, typography, spacing, radius, shadow, motion, and layout tokens. The new page must use these custom properties instead of introducing a second styling system.
- `components/design-system.tsx` and `components/icons.tsx` provide the existing component and icon conventions. Reuse `LearnitoMark` and `Icon` where they fit.
- `design.md` defines Learnito as calm, precise, quietly editorial, with a warm near white canvas, slate text, teal action color, Playfair Display style titles, and Inter style interface text.
- `package.json` uses Next.js 16.3.3, React 19, TypeScript, Tailwind CSS, and a Webpack production build because the default Turbopack build cannot bind in this environment.
- `design/learnito-home.png` is the visual source. It is 1024×1536 and contains the header, hero, search field, course cards, and decorative activity bars.
- No matching production avatar, course logo, or image asset exists outside the reference files. Do not use the reference screenshot as a runtime background and do not add remote image or font requests.

## Page composition

Build one public screen at `/` with these sections, in this order:

1. A narrow centered page shell with the warm canvas and fine diagonal rails at the outer edges.
2. A 98 pixel header with the Learnito mark and wordmark at left, `Courses` and `My Learning` navigation, a notification bell, and a circular learner avatar treatment at right.
3. A centered hero with the uppercase `INTELLIGENT LEARNING` eyebrow, the two line heading `Search your learning in plain English.`, supporting copy that names Learnito, the teal `Explore Courses` action with an arrow, and the large search field with a search icon and `⌘ K` key hint.
4. An `All Courses` section with a `View all courses` action and three cards: `Next.js for Production`, `Docker Essentials`, and `TypeScript Deep Dive`. Each card needs its local course mark, description, divider, level, duration, and module count as shown in the reference.
5. A centered announcement row reading `New courses and lessons added every week.` with a star icon and horizontal rules.
6. The soft teal activity bar motif at the bottom edge, kept decorative and hidden from assistive technology.

## Visual requirements

- Match the reference desktop geometry at 1024 pixels wide: the page shell, header rule, hero vertical rhythm, card widths and gaps, card padding, section spacing, and lower announcement placement.
- Use the existing Learnito tokens for all colors, type, spacing, radii, borders, shadows, motion, and control sizing. Add a token only if a real missing value is required, and keep that addition in `app/globals.css`.
- Use the display serif for the main heading, section heading, and course titles. Use the sans role for navigation, body copy, metadata, buttons, and labels.
- Translate the reference orange accent to the existing teal primary palette. Do not retain orange, green, or Vertex text in the implemented app surface.
- Draw the simple course marks in code with local SVG or CSS treatments. Use no emoji, third party logo fetch, or arbitrary remote asset.
- Use a local neutral avatar treatment with a clearly swappable implementation because no avatar asset is present. Keep the treatment close to the reference circular portrait silhouette and centralize its replacement point.
- Preserve the reference light only presentation. Do not add unrelated sections, footer content, gradients, or product chrome.

## Behavior and accessibility

- Use one `<main>` and one `<h1>`, with semantic `header`, `nav`, `section`, `form`, `ul`, and `article` elements.
- Keep the course collection in a typed local placeholder module because Sanity data is not wired in this slice. Mark the module with the required placeholder comment so a later data task can replace one import.
- Make the hero search a real labeled search control with a persistent accessible label, a keyboard usable submit path, visible focus treatment, and the reference placeholder and shortcut hint. Keep the destination ready for the later search route without inventing a search backend.
- Use real links for course navigation, the course list action, and the hero course action. Use accessible names for icon only controls and hide decorative icons from assistive technology.
- Add hover, active, and focus visible treatments using existing motion and color tokens. Keep touch targets at least 44 pixels on small screens.
- Keep the page usable at tablet and phone widths. Stack the course cards, let the header wrap or condense without clipping, scale the hero heading, make the search control fill the available width, and clip only the decorative lower bars if needed. Avoid horizontal page overflow.
- Respect reduced motion preferences.

## Security and boundaries

- This is a presentational home screen only. Do not add Sanity, Clerk, PostHog, MCP, search model, or write-token code.
- Keep the implementation a server rendered App Router page unless a narrowly scoped client boundary is required for the search control.
- Do not expose secrets, add environment variables, or fetch user data.
- Keep the screenshot and local design files as references, not public runtime assets.

## Expected files

- Update `app/page.tsx` to render the Learnito home screen.
- Update `app/layout.tsx` metadata so the page title describes Learnito home rather than the design system specimen.
- Add a focused home screen component, likely `components/home-page.tsx`, following the existing component conventions.
- Add a typed local placeholder data module, likely `lib/home-placeholder.ts`, only if it keeps the course data separate from layout code.
- Extend `components/icons.tsx` only for icons or marks required by the reference.
- Extend `app/globals.css` with home page styles and any genuinely missing tokens, without breaking the existing design system specimen styles.
- Do not modify `AGENTS.md`, the reference images, or unrelated public assets.

## Acceptance criteria

- AC 1: Visiting `/` renders the Learnito home page instead of the design system specimen.
- AC 2: The desktop page at 1024×1536 visually follows `design/learnito-home.png`, including the header, hero, search control, three course cards, announcement row, and bottom activity motif.
- AC 3: All visible product branding says Learnito, and all former orange action treatments use the existing teal tokens.
- AC 4: The course cards show the three reference courses with their level, duration, module count, descriptions, and local marks.
- AC 5: Header navigation, hero action, course list action, and course cards are semantic keyboard usable links or controls with visible focus states.
- AC 6: The page remains readable and free of unintended horizontal overflow at a phone width, with cards stacked and controls meeting touch target guidance.
- AC 7: The page uses the existing CSS token system, has no new remote assets or font requests, and leaves the existing design system implementation intact for later use.
- AC 8: Type checking, linting, and the production Webpack build pass.

## Checks to run

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `git diff --check`
- Render the root page in a browser at 1024×1536 and 390×844. Inspect both screenshots for alignment, typography, responsive stacking, focus visibility, and absence of horizontal overflow.
- Search changed application files for `Vertex`, `orange`, and `green`; none should remain in the implemented home surface.

## Manual test steps

1. Start the app with `npm run dev`.
2. Open `http://localhost:3000/` at 1024×1536 and compare it to `design/learnito-home.png`. Expect the same section order and overall proportions, with Learnito and teal substitutions.
3. Tab through the header, hero action, search control, course list action, and course cards. Expect a clear focus indicator and no skipped interactive control.
4. Resize to approximately 390×844. Expect the header and hero to fit, the search control to stay inside the viewport, and the three course cards to stack without horizontal page scrolling.
5. Submit the search control with the keyboard. Expect the control to accept input and preserve the planned search destination without any client side data access or secret exposure.

