# Studio context

The `studio/` directory is Learnito's standalone Sanity Studio workspace. It owns content schemas and authoring configuration. Keep it independent from the Next.js web app in the repository root.

## Commands

Run commands from this directory:

- `npm run dev` starts the local Studio.
- `npm run build` builds the Studio for deployment.
- `npm run deploy` deploys the Studio application.
- `npm run typecheck` checks the Studio TypeScript project.
- `npm run schema:deploy` deploys the extracted schema.
- `npm run typegen` extracts the schema and regenerates the root `sanity.types.ts` file.

## Conventions

- Read `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` from the environment. Do not commit project credentials.
- Register document and embedded object schemas in `schemaTypes/index.ts`.
- Keep modules embedded inside courses. Lessons, instructors, and categories are standalone documents.
- Derive module and lesson numbering from array order in the web data layer. Do not store display numbers in Sanity.
- Use Portable Text for lesson notes and references for relationships between documents.
- Keep Studio deployment separate from the Next.js application. Do not embed Studio routes in the web app.

_Drafted by /sync from the introducing change, worth a quick human pass._
