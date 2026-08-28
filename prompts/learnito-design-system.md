# Implementation prompt: Learnito design system

## Goal

Replace the default Next.js starter screen with a responsive design system specimen page at `/` that reproduces the composition of `design/learnito-designsystem.png`. The page is a visual reference for Learnito, the learning platform described in `AGENTS.md`. It should show the complete set of brand tokens and reusable interface examples visible in the reference, not a generic landing page. The rendered brand must say Learnito everywhere.

## Skills and guidance read

1. `AGENTS.md`
2. `.agents/skills/develop/SKILL.md`
3. `.agents/skills/develop/ui-guide.md`
4. `.agents/skills/develop/ui/image.md`
5. `.agents/skills/develop/ui/implementation.md`
6. `.agents/skills/develop/checklist.md`
7. The relevant Next.js 16.3.3 guides in `node_modules/next/dist/docs/` for layouts and pages, linking and navigation, server and client components, CSS, fonts, metadata, images, and the Link and Font APIs

The supplied image is the visual source of truth. The implementation should be faithful to its light canvas, compact specimen layout, typography, spacing, colors, cards, controls, and examples. There is no existing project design system to preserve.

## Code and config inspected

The repository is a single bare Next.js App Router project, not yet split into the future web and Studio workspaces described in `AGENTS.md`.

1. `package.json` has Next.js `16.3.3`, React `19.2.8`, Tailwind CSS `4`, TypeScript, and ESLint. There is no component library or icon package.
2. `app/page.tsx` is the untouched create Next App starter page.
3. `app/globals.css` only contains the starter background and foreground variables plus the Tailwind import.
4. `app/layout.tsx` loads remote Geist and Geist Mono through `next/font/google` and has starter metadata.
5. `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, and `tsconfig.json` contain starter configuration.
6. `public/` contains only the starter Vercel, Next, file, globe, and window assets. None matches the reference.
7. `design/learnito-designsystem.png` is a 1024 by 1536 light reference image. It contains fourteen numbered sections: colors, typography, type scale, spacing, radius and shadows, icons, buttons, inputs, badges and tags, status indicators, progress bar, cards, navigation, and principles.
8. There is no existing `design.md`, `docs/`, `prompts/`, component tree, token file, or local Inter or Playfair Display font file.

## Decisions and assumptions

1. This request is a UI screen build. The root route is the design system specimen page, with no Sanity, Clerk, PostHog, search, or progress integration because none is needed to render this reference.
2. `app/globals.css` is the canonical token source. It will contain the teal primary scale, neutral scale, semantic colors, type tokens, spacing scale, radius scale, shadows, motion values, and layout tokens. Component styles reference those custom properties instead of duplicating raw visual values.
3. The reference is light only. Keep the page in the reference light mode rather than inventing a dark specimen that is not present in the source image.
4. The reference names Playfair Display and Inter. Neither font is available locally, and the current remote Geist imports make the production build fail without network access. Remove the remote Google font imports and use the CSS stacks `"Playfair Display", Georgia, "Times New Roman", serif` for display text and `Inter, Arial, Helvetica, sans-serif` for interface text. This keeps the intended family names available when installed and provides an offline safe fallback.
5. Use inline SVG icon components for the outline and filled examples. No icon dependency is installed, and the screenshot requires a small, consistent set of line and filled icons. Keep decorative SVGs hidden from assistive technology and give every icon only control an accessible label.
6. Use no external imagery. The brand mark is a small inline teal Learnito L, and the card thumbnails remain the restrained geometric and solid treatments shown in the reference.
7. Keep the page server rendered. The sample buttons and fields can be real native controls so their focus, hover, disabled, and input behavior can be inspected, but they do not need application actions.
8. Keep the existing Tailwind 4 import available, while using scoped CSS classes and custom properties for the dense reference layout where that is clearer than long utility class strings.

## Expected files

Create or update only the following files unless verification requires a small configuration correction.

1. `app/page.tsx`: render the specimen page and its structured section data.
2. `components/design-system.tsx`: reusable specimen sections, cards, controls, token samples, and the page composition.
3. `components/icons.tsx`: typed inline SVG outline and filled icon primitives used by the page.
4. `app/globals.css`: the design tokens, font stacks, global reset, responsive layout, component styles, states, focus treatment, and reduced motion behavior.
5. `app/layout.tsx`: remove the failing remote Geist loaders and update the page metadata and document classes for Learnito.
6. `design.md`: record the image based visual character and build mandate, pointing at `app/globals.css` as the token source. Do not duplicate the token values in this file.

## Visual requirements

### Page frame

1. Use a warm near white canvas and compact centered content with the same faint borders and soft rounded corners as the reference.
2. Match the reference's stacked section rhythm, narrow gutters, section number labels, uppercase letter spacing, and quiet border treatment.
3. Preserve the desktop composition at approximately the reference width. The top section is split into a brand introduction and colors. The following rows pair typography with type scale, spacing with radius and shadows, icons with buttons and inputs, badges with status and progress, then place the card gallery, navigation, and principles across the width.
4. Keep content dense but readable. Do not add a marketing hero, footer, unrelated navigation, or extra product features.

### Brand and typography

1. Show the teal Learnito mark and wordmark, the title `Design System`, the supporting copy `A unified design language for Learnito learning platform. Clean, modern and focused on clarity, consistency and intuitive learning experiences.`, and the metadata `VERSION 1.0` and `MAY 2025`.
2. Use Playfair Display style serif text for display and section titles. Use Inter style sans text for labels, controls, body copy, and metadata.
3. Show both the serif `Ag` specimen labeled Playfair Display and the sans `Ag` specimen labeled Inter, with the small descriptors visible in the reference.
4. Show the type scale table with Display 1, Display 2, Heading 1, Heading 2, Heading 3, Body Large, Body, and Small, their fonts, sizes and line heights, weights, and uses as shown in the reference.

### Tokens

1. Show the five primary swatches from 500 through 100. Use the teal values `#14B8A6`, `#2DD4BF`, `#5EEAD4`, `#99F6E4`, and `#CCFBF1`.
2. Show the neutral swatches from 900 through 50 plus White. Use the visible slate values `#0F172A`, `#334155`, `#64748B`, `#CBD5E1`, `#E2E8F0`, `#F1F5F9`, `#FAFAFC`, and `#FFFFFF`.
3. Show the spacing scale from 4 through 64 pixels with the labels `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `3xl`, and `4xl`, plus their rem values. Base unit is 4 pixels.
4. Show radius examples for 4, 8, 12, 16, 24, and full circle.
5. Show the four shadow examples labeled Sm, Md, Lg, and Xl with visible offset, blur, spread, and rgba values.

### Components and states

1. Show outline and filled icon rows using the reference icon set: bell, search, play, document, bookmark, chart, clock, user, and chevron.
2. Show the button matrix with Primary, Secondary, Tertiary, and Text columns, and Default, Hover, and Disabled rows. Match the examples `Get Started`, `Explore Courses`, `View Lesson`, and `Watch Video` including the external link and play icons.
3. Keep the actual button controls at least 44 pixels high with a visible `:focus-visible` ring. Disabled samples must use the native disabled state where they are buttons.
4. Show a labeled search input with a search icon and `⌘ K` shortcut treatment, and a labeled native select set to `Most Relevant`. The fields are 44 pixels high with 12 pixel radius, 16 pixel horizontal padding, a 1 pixel neutral border, and teal focus treatment.
5. Show Video, Lesson, and Popular badges with their corresponding teal, violet, and pale teal treatments.
6. Show In Progress, Completed, Now Playing, and Locked indicators with shape and text, not color alone.
7. Show a 35 percent progress bar with text `35% complete`.
8. Show the four cards from the reference: a course card for `Next.js for Production`, a video lesson card for `Data Fetching in Server Components`, a lesson card for `Data Fetching & Caching`, and a resource card for `Caching and Revalidation Guide`. Preserve the labels, metadata, descriptions, icons, and action treatments.
9. Show the navigation samples for Learnito, Courses, My Learning, breadcrumbs, and pagination with the reference active states.
10. Show the four principles: Clarity First, Consistency, Focus & Calm, and Accessible, each with an icon, title, and supporting sentence.

## Responsive and accessibility requirements

1. Preserve the reference layout at desktop widths around 1024 pixels and above.
2. At tablet and phone widths, stack the large panels, collapse multi column card rows into one column, allow the type scale to scroll inside its own accessible table region if needed, and wrap icon, button, navigation, and principle samples without horizontal page overflow.
3. Include a skip to content link, one main landmark, one page heading, meaningful section headings, semantic lists and table markup where appropriate, real links for navigation samples, and real form controls for inputs.
4. Give every persistent field a visible label. Give image like brand marks and meaningful icons an accessible name or hide them when decorative. Give icon only buttons an accessible name.
5. Use visible focus indicators with at least 3 to 1 contrast against adjacent colors. Do not rely on color alone for status or badge meaning.
6. Respect `prefers-reduced-motion` by reducing or removing transitions and animation.
7. Keep body copy readable on small screens and interactive targets at least 44 by 44 pixels.
8. Avoid raw color and duplicate spacing, typography, radius, shadow, or motion literals in component markup. Keep token values in `app/globals.css`.

## Security and boundary considerations

1. This page is static and public. It must not read environment variables, Sanity, Clerk, PostHog, or any private service.
2. Do not add client tokens, remote asset requests, unsafe HTML injection, or a new backend route.
3. Keep all sample content local and clearly presentational.

## Acceptance criteria

1. AC 1: Visiting `/` renders the Learnito design system page instead of the create Next App starter page, with all fourteen numbered reference sections present and no legacy brand naming.
2. AC 2: The page uses the teal and neutral swatches, serif and sans typography roles, 4 pixel spacing scale, radius and shadow examples, and token backed component styles.
3. AC 3: The button, input, select, badges, status, progress, cards, navigation, and principle examples visually match the reference and include the displayed states and labels.
4. AC 4: The layout is responsive from desktop through phone widths, with no unintended horizontal page overflow and with the dense desktop composition preserved near 1024 pixels.
5. AC 5: The page is semantically structured and keyboard usable, with labels, accessible names, focus treatment, status text, and reduced motion behavior.
6. AC 6: The production build works without fetching Google fonts or any other network asset.
7. AC 7: The project type check and lint complete without new errors. The pre existing warning in `.agents/skills/create-agent-with-sanity-context/references/ecommerce/app/src/app/api/chat/route.ts` may remain and must not be changed as part of this UI work.

## Checks to run

Run these from `/home/mohammad/code/learnito` after implementation.

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Start `npm run dev` and inspect the root route in a browser at approximately 1024 by 1536 and at a phone width around 390 pixels.

## Manual test steps

1. Open `/` at a desktop width around 1024 pixels. Expect the complete fourteen section specimen sheet, with the split rows and compact spacing matching `design/learnito-designsystem.png`. Covers AC 1, AC 2, and AC 3.
2. Tab from the top of the page. Expect the skip link, navigation links, buttons, input, select, and pagination controls to receive a clear visible focus ring in logical order. Covers AC 5.
3. Focus the search field, type text, and change the select. Expect both controls to remain labeled and usable without pointer input. Covers AC 3 and AC 5.
4. Resize to about 390 pixels wide. Expect panels and card examples to stack or wrap, the type scale to remain usable, and no horizontal overflow on the page. Covers AC 4.
5. Enable reduced motion in the operating system or browser and revisit the page. Expect no distracting transitions or animation. Covers AC 5.
6. Run the three command checks above with network access unavailable. Expect the type check, lint, and production build to complete, with no remote font fetch failure. Covers AC 6 and AC 7.

## Implementation handoff

After approval, build only this prompt. Before reporting completion, inspect the rendered page at desktop and phone sizes, audit it against the UI skill disqualifiers and accessibility checklist, and fix any visual or semantic defects found.
