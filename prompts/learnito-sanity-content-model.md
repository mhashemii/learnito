# Learnito Sanity content model and server data layer implementation prompt

## Goal

Implement the Learnito content foundation described in `AGENTS.md`:

- a standalone Sanity Studio for authoring courses, lessons, instructors, and categories;
- Sanity schemas for `course`, embedded `module`, `lesson`, `instructor`, and `category`;
- a server-only Next.js Sanity client that reads the private dataset with a read token;
- a typed GROQ query and data-access layer for the future catalog, course, lesson, instructor, and category pages.

Keep this slice focused on content modeling, Studio authoring, and read access. Do not build the catalog UI, course pages, lesson pages, search, progress, analytics, video ingestion, agent context, or content import in this task.

## Skills and guidance read

- `AGENTS.md` for the product data shape, the two-workspace boundary, the private dataset rule, the approval gate, and required checks.
- `.agents/skills/develop/SKILL.md` for the implementation-prompt and build workflow.
- `.agents/skills/content-modeling-best-practices/SKILL.md` for document modeling, references versus embedded objects, and separation of content from presentation.
- `.agents/skills/sanity-best-practices/SKILL.md` and its references for schema definitions, GROQ, Next.js integration, Studio structure, images, Portable Text, and TypeGen.
- `node_modules/next/dist/docs/` for the installed Next.js 16 App Router and server-boundary conventions.

## Code and configuration inspected

- `package.json` is a single Next.js 16.3.3 application with React 19, `next-sanity` 13.3.3, Sanity 5.31.2, `@sanity/image-url`, and the existing Learnito UI dependencies.
- `app/studio/[[...tool]]/page.tsx` mounts `NextStudio` inside the Next application. This conflicts with `AGENTS.md`, which requires independent web and Studio workspaces.
- `sanity.config.ts`, `sanity.cli.ts`, `sanity/structure.ts`, and `sanity/schemaTypes/index.ts` are the generated empty Studio scaffold.
- `sanity/env.ts` reads the public project and dataset identifiers but has no server read-token boundary.
- `sanity/lib/client.ts` currently creates an unauthenticated CDN client, `sanity/lib/live.ts` exposes the default live helper, and `sanity/lib/image.ts` contains the existing public image URL builder.
- There are no content schemas, GROQ queries, data-access functions, generated Sanity types, or committed environment template.
- `tsconfig.json` currently includes every TypeScript file below the repository root, so the standalone Studio must be excluded from the web TypeScript project.
- The repository is on `main`, clean before this prompt, and already contains the earlier Learnito design, home, Clerk, and initial Sanity scaffold commits.

## Decisions and assumptions

1. Migrate the empty embedded Studio into a real `studio/` workspace. The Next.js app will not retain `/studio` or any `NextStudio` route.
2. The root package remains the web workspace. It keeps `next-sanity` and `@sanity/image-url`; Studio-only packages move to `studio/package.json` so the workspaces can be deployed independently.
3. The Studio uses Sanity 5.31.2, `structureTool`, and `@sanity/vision`. Do not add `@sanity/context`; the search configuration and Context MCP are a later slice, and the current Sanity major must not be coupled to an unsupported plugin.
4. The document types are exactly `course`, `lesson`, `instructor`, and `category`. `module`, `learningOutcome`, and `resource` are embedded object types. No standalone module document or parent-course field is added to lessons.
5. Use the following field names and semantics:
   - `course`: `title`, `slug`, `summary`, `coverImage`, `level`, `price`, `isPopular`, `studentCount`, `learningOutcomes`, `instructor`, `category`, `modules`.
   - `module`: `title`, `summary`, `lessons`, where `lessons` is an ordered array of references to `lesson` documents.
   - `learningOutcome`: `icon`, `title`, `description`.
   - `lesson`: `title`, `slug`, `videoUrl`, `poster`, `duration`, `isFreePreview`, `studentCount`, `notes`, `keyPoints`, `proTip`, `resources`.
   - `resource`: `type`, `title`, `description`, `url`.
   - `instructor`: `name`, `slug`, `photo`, `expertise`, `bio`.
   - `category`: `title`, `slug`, `description`.
6. `duration` is a non-negative integer number of seconds. `price` is a non-negative number in the project display currency; do not add currency or payment behavior in this slice. Counts are non-negative integer numbers.
7. `level` is a required option with `beginner`, `intermediate`, and `advanced` values. Resource `type` is a required option with `article`, `video`, `download`, and `link` values. `learningOutcome.icon` is a short stable semantic key, not an uploaded asset or a CSS class.
8. `notes` is a Portable Text array using Sanity’s standard block member with ordinary text styles and marks. `bio` and `description` are plain text fields unless the existing product later needs richer editorial formatting. Do not store Markdown in content fields.
9. Images use Sanity image fields with hotspot support and a required `alt` field. `videoUrl` is a URL field limited to HTTP and HTTPS; provider-specific playback and ingestion are deliberately outside this task.
10. Required fields have editor validation, arrays have sensible minimums and maximums, and reference inputs target only the intended document type. Slugs are generated from titles and required. Do not store derived module or lesson numbers; the data layer derives them from array order.
11. The web client reads only the published perspective from the private dataset. `SANITY_API_READ_TOKEN` is read only in a module marked `server-only`; no token, live helper, browser client, or Sanity write capability may enter a client bundle.
12. Use `useCdn: false`, `perspective: 'published'`, and Next request caching on the server helper. The helper exposes a small generic `sanityFetch` function with revalidation and tag options, not the draft/live preview API.
13. Define named GROQ queries with `defineQuery` in `sanity/lib/queries.ts`. Project fields explicitly, expand references needed by the future UI, include `_key` on embedded arrays, and use reverse references to find a lesson’s parent course. Never return video documents or whole transcripts in this slice.
14. Add Sanity TypeGen configuration in the Studio and generate the web query types into a tracked root `sanity.types.ts` file when the local CLI supports it. Query names must be unique and the TypeScript project must include the generated file.
15. Do not deploy to Sanity or import documents during implementation unless the configured CLI session and project credentials already make that operation safe and the command can be verified. The code must include clear manual commands for schema extraction, TypeGen, Studio deployment, and schema deployment; missing project identifiers or tokens are a setup requirement, not a reason to commit placeholders as secrets.

## Required implementation

### Standalone Studio

Create a `studio/` package with its own package manifest, TypeScript config, Sanity CLI config, Studio config, TypeGen configuration, schema directory, and structure resolver. Configure the project and dataset from environment variables. Set the Studio title and visible authoring labels to Learnito.

The Studio structure should present four clear document lists in this order: Courses, Lessons, Instructors, Categories. Object types must remain embedded in their parent forms and must not appear as document lists.

Remove the embedded Next Studio route and the root Studio config files that only served that route. Update the root TypeScript configuration and dependency manifest so the web and Studio remain independent. Preserve the root `sanity/env.ts` and image URL builder for web use, with only public identifiers in modules that may be imported by UI code.

### Schema details

Implement each schema with `defineType`, `defineField`, and `defineArrayMember`.

- Course title, slug, summary, cover image, level, and instructor/category references are required. Popular and free-form display counts default safely to false and zero. Course modules require at least one item; each module requires a title and at least one lesson reference.
- Lesson title, slug, video URL, poster, duration, and display count are required or defaulted as appropriate. Notes are Portable Text. Key points are short required strings with a bounded list. Pro tip is optional. Resources are bounded embedded objects with required type, title, description, and valid URL.
- Instructor name, slug, photo, expertise, and bio are modeled as editorial fields.
- Category title, slug, and description are modeled as reusable taxonomy fields.
- Add useful descriptions and previews so an author can understand how fields are used without reading source code.

### Server client and data layer

Create a server-only client module and data-access module under `sanity/lib/`. The data layer must provide these functions, or equivalent names with the same responsibilities:

- `getCourses()` for the ordered catalog list;
- `getCourseBySlug(slug)` for a course with its ordered modules, lesson references resolved, instructor, category, outcomes, and cover image;
- `getLessonBySlug(slug)` for a lesson with notes, key points, pro tip, resources, poster, and reverse-resolved course/module context;
- `getInstructors()` and `getInstructorBySlug(slug)`;
- `getCategories()` and `getCategoryBySlug(slug)`;
- slug helpers for future static routes if they are useful to the query layer.

Course and lesson data returned by the data layer may contain computed `moduleNumber` and `lessonNumber` values for rendering, but those values must be derived from array indexes and never queried from or stored in Sanity. A missing slug returns `null` for singular lookups and an empty array for collections.

Use explicit query projections and small context projections. A lesson lookup may make a second reverse-reference query to resolve its course and module if that keeps GROQ scope clear. The query layer must not expose the Sanity client to components, and no client component may import the server data module.

Add a committed `.env.example` containing placeholders for the public Sanity project ID, dataset, API version, and server-only read token. Do not read, print, copy, or commit values from the existing ignored environment file.

## Security and boundaries

- Keep `SANITY_API_READ_TOKEN` server-only and fail clearly when it is missing at request time.
- Never put the read token in `NEXT_PUBLIC_*`, Studio source, browser code, generated client code, or logs.
- Use a published read perspective and no mutations from the web data layer.
- Keep Studio credentials and environment configuration separate from the Next.js client bundle.
- Use `server-only` to make accidental client imports fail during the Next.js build.
- Do not add content writes, user progress, authentication changes, search calls, MCP calls, or remote assets.

## Expected files

Likely files to add or update:

- `studio/package.json` and `studio/package-lock.json`;
- `studio/tsconfig.json`, `studio/sanity.cli.ts`, `studio/sanity.config.ts`, and `studio/structure.ts`;
- `studio/schemaTypes/index.ts`;
- `studio/schemaTypes/course.ts`, `lesson.ts`, `instructor.ts`, `category.ts`;
- `studio/schemaTypes/objects/module.ts`, `learningOutcome.ts`, and `resource.ts`;
- root `package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`, and `.env.example`;
- root `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/queries.ts`, `sanity/lib/data.ts`, and any small shared type helper required by the data layer;
- remove `app/studio/[[...tool]]/page.tsx`, root `sanity.cli.ts`, root `sanity.config.ts`, root `sanity/structure.ts`, root empty schema files, and `sanity/lib/live.ts` once their responsibilities are moved or replaced.

Do not modify the Learnito UI components, design references, Clerk routes, or unrelated product features.

## Acceptance criteria

- AC 1: The repository has an independent `studio/` workspace that starts and builds with the configured Sanity project and dataset; the Next app no longer embeds Sanity Studio.
- AC 2: The Studio schema contains exactly the requested document and embedded object model, with required fields, useful validation, correct references, Portable Text notes, image alt text, and no standalone module or lesson parent field.
- AC 3: Studio navigation exposes Courses, Lessons, Instructors, and Categories as authoring lists, while embedded objects stay inside parent documents.
- AC 4: Root web data access uses a server-only, published-perspective Sanity client with `SANITY_API_READ_TOKEN`; no secret is exposed to browser code.
- AC 5: Named GROQ queries and data functions cover courses, course-by-slug, lessons with reverse course context, instructors, and categories, with explicit projections and ordered results.
- AC 6: Module and lesson numbering is derived from array order in the returned data layer and is not stored in the schema or query source fields.
- AC 7: TypeGen configuration and generated query types are present or the exact CLI limitation is documented in the final report; the web TypeScript project excludes the standalone Studio source.
- AC 8: Existing Learnito pages, Clerk authentication, and design-system styling remain unchanged in behavior.
- AC 9: Web type checking, linting, production build, Studio type checking, schema extraction, and diff checks pass when run with the appropriate environment setup. Any credential-gated deployment check is reported with its real output rather than claimed as passed.

## Checks to run

From the repository root:

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. `git diff --check`

From `studio/`:

1. `npx tsc --noEmit -p tsconfig.json`
2. `npm run schema:extract` (the script uses `sanity schemas extract` for the installed CLI)
3. `npm run typegen`
4. `npm run build` when project and dataset environment values are available.

Also inspect the final diff for `SANITY_API_READ_TOKEN` usage and confirm it occurs only in server-side code or environment templates. If credentials are available, run `npm run deploy` and `npm run schema:deploy` from `studio/`; otherwise give the user those exact commands and the required environment setup.

## Manual test steps

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, and `SANITY_API_READ_TOKEN` in the web environment. Set the project and dataset variables for the Studio process without committing their values.
2. From `studio/`, run `npm run dev` and open the local Studio URL. Confirm the Learnito title and the four document lists are visible.
3. Create or inspect one category, instructor, lesson, and course. Confirm course modules are reorderable embedded objects, each lesson selector only offers lesson documents, and lesson notes render as Portable Text input.
4. Publish a small fixture course and lesson in Studio. Run the web data-layer functions from a server component or a temporary server-side check and confirm course, instructor, category, and reverse lesson context resolve correctly.
5. Confirm the returned module and lesson labels change when array order changes, without any stored number fields.
6. Search browser bundles and client-importable modules for the Sanity read token name or value. It must not be present outside server-only code and environment templates.
