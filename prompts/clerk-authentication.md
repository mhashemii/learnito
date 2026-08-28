# Clerk authentication integration

## Goal

Finish the Clerk authentication setup that was initialized by the Clerk CLI for the existing Learnito Next.js App Router application. Keep the public learning homepage public, expose clear sign-in and sign-up actions, show Clerk's signed-in user control, and preserve the existing Learnito visual system.

## Skills and guidance read

- `clerk` router: route setup work to the setup, CLI, custom UI, and Next.js pattern guidance.
- `clerk-cli`: use the host CLI, keep secrets out of source control, and verify with `clerk doctor --json`.
- `clerk-setup`: use `@clerk/nextjs`, keep `ClerkProvider` inside `<body>`, and use the CLI-generated routes/env configuration.
- `clerk-custom-ui`: use the current SDK components and appearance patterns; no custom hook flow is needed.
- `clerk-nextjs-patterns`: keep public-first middleware behavior and use current Next.js proxy conventions.
- `AGENTS.md`: preserve server/client boundaries, document checks, and avoid unrelated feature work.
- Next.js 16 local docs: `proxy.ts` is the current proxy convention and `ClerkProvider` belongs inside the document body.

## Existing code and setup inspected

- `package.json`: Next.js `16.3.3`, React `19.2.8`, npm lockfile, and no existing auth dependency before CLI setup.
- `app/layout.tsx`: Learnito metadata and CLI-added `ClerkProvider` inside `<body>`.
- `proxy.ts`: CLI-added `clerkMiddleware()` with the default static-asset exclusions and API/TRPC matcher.
- `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`: CLI-generated hosted Clerk components.
- `components/home-page.tsx`: public Learnito landing page with a notification button and a placeholder profile avatar.
- `app/globals.css`: existing teal Learnito tokens and homepage styles; no shadcn `components.json` is present.
- `.gitignore`: `.env*` is ignored; `.env.local` was populated by the CLI and must not be read, printed, or committed.

## Decisions and assumptions

- Use the already linked Clerk application `app_3IXyGqJMWvnJ8tJ3DAHnGh5YX1q` and its development instance.
- Keep all routes public by default. Do not add route protection until a feature explicitly requires it.
- Use `Show`, `SignInButton`, `SignUpButton`, and `UserButton` from `@clerk/nextjs` in the existing homepage header.
- Use modal sign-in/sign-up triggers when supported by the installed current SDK, while retaining the generated `/sign-in` and `/sign-up` routes as fallback/deep-link destinations.
- Preserve the screenshot-driven Learnito header. Add compact branded auth actions for signed-out visitors and replace the placeholder avatar with Clerk's signed-in user button; do not redesign other homepage sections.
- Do not add `@clerk/ui` or a shadcn theme because this project has no `components.json` and the request does not require a custom auth flow.

## Expected files to touch

- `proxy.ts`: add `'/__clerk/:path*'` exactly once after `'/(api|trpc)(.*)'` in the matcher array.
- `components/auth-controls.tsx`: add a small reusable header control using Clerk's signed-out and signed-in components, if that keeps the homepage component readable.
- `components/home-page.tsx`: replace the placeholder profile link with the auth controls without changing public navigation or homepage content.
- `app/globals.css`: style the auth controls to match the existing teal/neutral Learnito system and remain usable at the existing mobile breakpoint.
- `prompts/clerk-authentication.md`: this implementation prompt.

The CLI-generated `app/layout.tsx`, auth routes, `package.json`, `package-lock.json`, and `.env.local` should be preserved. Do not edit `.env.local` manually or include it in a diff.

## Requirements

1. The root layout must keep `ClerkProvider` inside `<body>` and use `@clerk/nextjs`.
2. `proxy.ts` must retain the CLI's asset exclusions and API/TRPC matcher, plus `'/__clerk/:path*'` once after the API/TRPC matcher.
3. Signed-out visitors must see accessible sign-in and sign-up actions in the homepage header.
4. Signed-in visitors must see `UserButton`; do not expose a secret key or use a client-side token.
5. The generated sign-in and sign-up routes must remain available.
6. Homepage browsing remains public and no unrelated routes/features are protected or implemented.
7. Auth controls must have visible focus states, useful accessible labels, and fit the desktop and mobile header without changing the rest of the design.

## Security considerations

- Keep `CLERK_SECRET_KEY` server-only; only the publishable key may be browser-visible through Clerk's supported provider setup.
- Never print, inspect, commit, or hardcode `.env.local` values.
- Do not call Clerk APIs, MCP services, or auth writes from the browser directly.
- Do not use `auth()` in this presentational header; if future protected server code is added, use `await auth()`.

## Acceptance criteria

- `clerk doctor --json` reports pass for login, project link, application reachability, environment variables, and CLI version; only optional production/shell-completion warnings may remain.
- The app compiles with the current `@clerk/nextjs` SDK and Next.js 16 proxy convention.
- On `/`, a signed-out browser can identify and activate both sign-in and sign-up actions.
- On `/`, a signed-in browser sees Clerk's profile/user control in the same header position.
- `/sign-in` and `/sign-up` render the generated Clerk UI.
- No secret values appear in tracked files or command output.
- Existing Learnito homepage layout, teal palette, and responsive behavior remain intact.

## Checks to run

- `clerk doctor --json` from the project root (host execution).
- `npm run lint`.
- `npx tsc --noEmit`.
- `npm run build` because layout, proxy, routes, and server integration changed.
- `git diff --check`.
- Start the dev server and check `/`, `/sign-in`, and `/sign-up` in a browser.

## Manual test steps

1. Run `npm run dev` from the project root.
2. Open `http://localhost:3000/` in a private/incognito window and verify the Learnito homepage is public.
3. Verify the header exposes both sign-in and sign-up actions, and activate each one to confirm Clerk's UI opens or the generated route loads.
4. Complete sign-up with a test account in the linked development instance.
5. Return to `/` and verify the placeholder avatar is replaced by the Clerk profile control; open it and confirm the account menu renders.
6. Sign out, then verify the signed-out controls return.
7. Open `/sign-in` and `/sign-up` directly and confirm each generated page renders without a middleware redirect loop.
