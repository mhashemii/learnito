import { Icon, type IconName, LearnitoMark } from "@/components/icons";

type SectionHeadingProps = {
  id: string;
  index: string;
  title: string;
};

const primarySwatches = [
  { label: "Primary 500", token: "primary-500" },
  { label: "Primary 400", token: "primary-400" },
  { label: "Primary 300", token: "primary-300" },
  { label: "Primary 200", token: "primary-200" },
  { label: "Primary 100", token: "primary-100" },
] as const;

const neutralSwatches = [
  { label: "Neutral 900", token: "neutral-900" },
  { label: "Neutral 700", token: "neutral-700" },
  { label: "Neutral 500", token: "neutral-500" },
  { label: "Neutral 300", token: "neutral-300" },
  { label: "Neutral 200", token: "neutral-200" },
  { label: "Neutral 100", token: "neutral-100" },
  { label: "Neutral 50", token: "neutral-50" },
  { label: "White", token: "white" },
] as const;

const typeScale = [
  { name: "Display 1", font: "Playfair Display", scale: "48 / 56", weight: "Bold", use: "Page titles", style: "display-1" },
  { name: "Display 2", font: "Playfair Display", scale: "36 / 44", weight: "Bold", use: "Section titles", style: "display-2" },
  { name: "Heading 1", font: "Inter", scale: "28 / 36", weight: "Semi Bold", use: "Card titles", style: "heading-1" },
  { name: "Heading 2", font: "Inter", scale: "22 / 30", weight: "Semi Bold", use: "Sub section", style: "heading-2" },
  { name: "Heading 3", font: "Inter", scale: "18 / 26", weight: "Medium", use: "Small titles", style: "heading-3" },
  { name: "Body Large", font: "Inter", scale: "16 / 24", weight: "Regular", use: "Body copy", style: "body-large" },
  { name: "Body", font: "Inter", scale: "14 / 20", weight: "Regular", use: "Supporting text", style: "body" },
  { name: "Small", font: "Inter", scale: "12 / 16", weight: "Regular", use: "Captions, meta", style: "small" },
] as const;

const spacingTokens = [
  { name: "xs", pixels: "4", rem: "0.25rem" },
  { name: "sm", pixels: "8", rem: "0.5rem" },
  { name: "md", pixels: "12", rem: "0.75rem" },
  { name: "base", pixels: "16", rem: "1rem" },
  { name: "lg", pixels: "24", rem: "1.5rem" },
  { name: "xl", pixels: "32", rem: "2rem" },
  { name: "2xl", pixels: "40", rem: "2.5rem" },
  { name: "3xl", pixels: "48", rem: "3rem" },
  { name: "4xl", pixels: "64", rem: "4rem" },
] as const;

const radiusTokens = [
  { name: "xs", pixels: "4px" },
  { name: "sm", pixels: "8px" },
  { name: "md", pixels: "12px" },
  { name: "lg", pixels: "16px" },
  { name: "xl", pixels: "24px" },
  { name: "full", pixels: "circle" },
] as const;

const shadowTokens = [
  { name: "Sm", token: "sm", detail: "0 1px 2px 0 rgba(15, 23, 42, 0.05)" },
  { name: "Md", token: "md", detail: "0 4px 12px -2px rgba(15, 23, 42, 0.08)" },
  { name: "Lg", token: "lg", detail: "0 12px 24px -4px rgba(15, 23, 42, 0.10)" },
  { name: "Xl", token: "xl", detail: "0 20px 40px -8px rgba(15, 23, 42, 0.12)" },
] as const;

const iconNames: IconName[] = [
  "bell",
  "search",
  "play",
  "document",
  "bookmark",
  "chart",
  "clock",
  "user",
  "chevron",
];

const buttonColumns = [
  { kind: "primary", label: "Get Started" },
  { kind: "secondary", label: "Explore Courses" },
  { kind: "tertiary", label: "View Lesson" },
  { kind: "text", label: "Watch Video" },
] as const;

const statusItems = [
  { label: "In Progress", icon: "progress" },
  { label: "Completed", icon: "check" },
  { label: "Now Playing", icon: "play" },
  { label: "Locked", icon: "lock" },
] as const;

const principles = [
  { title: "Clarity First", description: "Every element should communicate clearly.", icon: "eye" },
  { title: "Consistency", description: "Use components and patterns consistently across the platform.", icon: "grid" },
  { title: "Focus & Calm", description: "Remove noise and help learners focus on what matters.", icon: "target" },
  { title: "Accessible", description: "Design with accessibility and inclusivity in mind.", icon: "accessibility" },
] as const;

function SectionHeading({ id, index, title }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-index" aria-hidden="true">
        {index}
      </span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function ColorSwatch({ label, token }: { label: string; token: string }) {
  return (
    <li className="swatch-item">
      <span className={`swatch swatch--${token}`} aria-hidden="true" />
      <span className="swatch-label">{label}</span>
      <span className={`swatch-hex swatch-hex--${token}`} aria-hidden="true" />
    </li>
  );
}

function FontSpecimen({ display }: { display: boolean }) {
  return (
    <div className="font-specimen">
      <span className={`font-glyph ${display ? "font-glyph--display" : "font-glyph--sans"}`} aria-hidden="true">
        Ag
      </span>
      <div>
        <h3>{display ? "Playfair Display" : "Inter"}</h3>
        <p className="specimen-details">
          {display ? "Elegant" : "Clean"}
          <span aria-hidden="true">•</span>
          {display ? "Readable" : "Modern"}
          <span aria-hidden="true">•</span>
          {display ? "Timeless" : "Highly legible"}
        </p>
      </div>
    </div>
  );
}

function ButtonExample({
  kind,
  label,
  state,
}: {
  kind: (typeof buttonColumns)[number]["kind"];
  label: string;
  state: "default" | "hover" | "disabled";
}) {
  const isDisabled = state === "disabled";
  const stateClass = state === "hover" ? "is-hover-preview" : "";

  return (
    <button
      className={`showcase-button showcase-button--${kind} ${stateClass}`}
      disabled={isDisabled}
      type="button"
    >
      <span>{label}</span>
      {kind === "tertiary" && <Icon name="external" className="button-icon" />}
      {kind === "text" && <Icon name="play" className="button-icon" />}
    </button>
  );
}

function ButtonMatrix() {
  const rows = [
    { label: "Default", state: "default" as const },
    { label: "Hover", state: "hover" as const },
    { label: "Disabled", state: "disabled" as const },
  ];

  return (
    <div className="button-matrix" aria-label="Button states">
      <div className="button-matrix__corner" />
      {buttonColumns.map((button) => (
        <div className="button-matrix__heading" key={button.kind}>
          {button.kind[0].toUpperCase() + button.kind.slice(1)}
        </div>
      ))}
      {rows.map((row) => (
        <div className="button-matrix__row" key={row.label}>
          <div className="button-matrix__state">{row.label}</div>
          {buttonColumns.map((button) => (
            <ButtonExample key={`${row.label}-${button.kind}`} {...button} state={row.state} />
          ))}
        </div>
      ))}
    </div>
  );
}

function StatusIcon({ icon }: { icon: (typeof statusItems)[number]["icon"] }) {
  if (icon === "progress") {
    return <span className="status-ring" aria-hidden="true" />;
  }

  return <Icon name={icon} filled={icon === "play"} className="status-icon" />;
}

function Badge({ children, tone }: { children: string; tone: "video" | "lesson" | "popular" }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

function CourseCard() {
  return (
    <article className="sample-card sample-card--course">
      <div className="course-card-heading">
        <span className="course-logo" aria-hidden="true">
          N
        </span>
        <div>
          <h3>Next.js for Production</h3>
          <p>Build scalable, high-performance web applications with Next.js.</p>
        </div>
      </div>
      <div className="card-meta">
        <span><Icon name="chart" /> Intermediate</span>
        <span><Icon name="clock" /> 18h 24m</span>
        <span><Icon name="folder" /> 12 modules</span>
      </div>
    </article>
  );
}

function VideoLessonCard() {
  return (
    <article className="sample-card sample-card--lesson-video">
      <Badge tone="video">Video</Badge>
      <h3>Data Fetching in Server Components</h3>
      <p>Learn how to fetch data on the server using async/await and Next.js best practices.</p>
      <div className="lesson-card-footer">
        <span>Lesson 5.1&nbsp; · &nbsp;12:45</span>
        <a href="#navigation" className="card-action">
          <Icon name="play" /> Watch from 12:45
        </a>
      </div>
    </article>
  );
}

function LessonCard() {
  return (
    <article className="sample-card sample-card--lesson">
      <Badge tone="lesson">Lesson</Badge>
      <h3>Data Fetching &amp; Caching</h3>
      <p>Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance.</p>
      <div className="lesson-card-footer">
        <span>Module 5</span>
        <a href="#navigation" className="card-action">
          View lesson <Icon name="external" />
        </a>
      </div>
    </article>
  );
}

function ResourceCard() {
  return (
    <article className="sample-card sample-card--resource">
      <div className="resource-card-heading">
        <span className="resource-icon" aria-hidden="true"><Icon name="document" /></span>
        <div>
          <h3>Caching and Revalidation Guide</h3>
          <p>Deep dive into Next.js caching strategies.</p>
        </div>
      </div>
      <div className="lesson-card-footer">
        <span>PDF&nbsp; · &nbsp;1.2 MB</span>
        <a href="#navigation" className="card-action" aria-label="Open Caching and Revalidation Guide">
          <Icon name="external" />
        </a>
      </div>
    </article>
  );
}

export function DesignSystem() {
  return (
    <div className="design-system-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main className="design-system-shell" id="main-content">
        <section className="panel hero-panel" aria-labelledby="colors-heading">
          <div className="hero-intro">
            <div className="brand-lockup">
              <span className="brand-mark-wrap"><LearnitoMark /></span>
              <span>Learnito</span>
            </div>
            <h1>Design System</h1>
            <p className="hero-copy">A unified design language for Learnito learning platform. Clean, modern and focused on clarity, consistency and intuitive learning experiences.</p>
            <div className="hero-meta">
              <span>Version 1.0</span>
              <span aria-hidden="true">•</span>
              <span>May 2025</span>
            </div>
          </div>
          <div className="hero-colors">
            <SectionHeading id="colors-heading" index="01" title="Colors" />
            <div className="color-group">
              <h3>Primary</h3>
              <ul className="swatch-row swatch-row--primary">
                {primarySwatches.map((swatch) => <ColorSwatch key={swatch.token} {...swatch} />)}
              </ul>
            </div>
            <div className="color-group">
              <h3>Neutral</h3>
              <ul className="swatch-row swatch-row--neutral">
                {neutralSwatches.map((swatch) => <ColorSwatch key={swatch.token} {...swatch} />)}
              </ul>
            </div>
          </div>
        </section>

        <div className="layout-row layout-row--type">
          <section className="panel typography-panel" aria-labelledby="typography-heading">
            <SectionHeading id="typography-heading" index="02" title="Typography" />
            <div className="font-specimens">
              <FontSpecimen display />
              <FontSpecimen display={false} />
            </div>
          </section>

          <section className="panel type-scale-panel" aria-labelledby="type-scale-heading">
            <SectionHeading id="type-scale-heading" index="03" title="Type Scale" />
            <div className="table-scroll" tabIndex={0} aria-label="Type scale table. Scroll horizontally if needed.">
              <table className="type-scale-table">
                <thead>
                  <tr><th scope="col">Style</th><th scope="col">Font</th><th scope="col">Size / Line Height</th><th scope="col">Weight</th><th scope="col">Use</th></tr>
                </thead>
                <tbody>
                  {typeScale.map((item) => (
                    <tr key={item.name}>
                      <th scope="row" className={`type-scale-name type-scale-name--${item.style}`}>{item.name}</th>
                      <td>{item.font}</td><td>{item.scale}</td><td>{item.weight}</td><td>{item.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="layout-row layout-row--spacing">
          <section className="panel spacing-panel" aria-labelledby="spacing-heading">
            <SectionHeading id="spacing-heading" index="04" title="Spacing System" />
            <p className="panel-kicker">Base unit: 4px</p>
            <ul className="spacing-row">
              {spacingTokens.map((item) => (
                <li className="spacing-item" key={item.name}>
                  <span className={`spacing-bar spacing-bar--${item.name}`} aria-hidden="true" />
                  <strong>{item.pixels}</strong>
                  <span>{item.name}</span>
                  <small>({item.rem})</small>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel radius-panel" aria-labelledby="radius-heading">
            <SectionHeading id="radius-heading" index="05" title="Radius & Shadows" />
            <div className="radius-block">
              <h3>Radius</h3>
              <ul className="radius-row">
                {radiusTokens.map((item) => (
                  <li className="radius-item" key={item.name}>
                    <span className={`radius-shape radius-shape--${item.name}`} aria-hidden="true" />
                    <strong>{item.pixels}</strong>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shadow-block">
              <h3>Shadows</h3>
              <ul className="shadow-row">
                {shadowTokens.map((item) => (
                  <li className={`shadow-sample shadow-sample--${item.token}`} key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="layout-row layout-row--components">
          <section className="panel icons-panel" aria-labelledby="icons-heading">
            <SectionHeading id="icons-heading" index="06" title="Icons" />
            <h3 className="sub-label">Outline Style</h3>
            <div className="icon-row">
              {iconNames.map((name) => <span className="icon-sample" key={`outline-${name}`}><Icon name={name} /></span>)}
            </div>
            <h3 className="sub-label">Filled Style</h3>
            <div className="icon-row icon-row--filled">
              {iconNames.map((name) => <span className="icon-sample" key={`filled-${name}`}><Icon name={name} filled /></span>)}
            </div>
            <ul className="spec-list">
              <li>24x24px icons</li>
              <li>2px stroke width (outline)</li>
              <li>Rounded line caps</li>
              <li>Consistent optical balance</li>
            </ul>
          </section>

          <section className="panel buttons-panel" aria-labelledby="buttons-heading">
            <SectionHeading id="buttons-heading" index="07" title="Buttons" />
            <ButtonMatrix />
            <h3 className="sub-label sub-label--button-specs">Button Specs</h3>
            <ul className="spec-list spec-list--button">
              <li>Height: 44px (default)</li>
              <li>Padding: 0 16px (lg), 0 12px (md)</li>
              <li>Radius: 12px</li>
              <li>Font: Inter Medium (14–16px)</li>
            </ul>
          </section>

          <section className="panel inputs-panel" aria-labelledby="inputs-heading">
            <SectionHeading id="inputs-heading" index="08" title="Inputs" />
            <div className="form-field">
              <label htmlFor="design-system-search">Search / Text Input</label>
              <div className="input-wrap">
                <Icon name="search" />
                <input id="design-system-search" type="search" placeholder="Search anything..." />
                <kbd>⌘ K</kbd>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="design-system-select">Select</label>
              <div className="select-wrap">
                <select id="design-system-select" defaultValue="relevant">
                  <option value="relevant">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                </select>
                <Icon name="chevron" />
              </div>
            </div>
            <h3 className="sub-label sub-label--field-specs">Field Specs</h3>
            <ul className="spec-list">
              <li>Height: 44px</li>
              <li>Radius: 12px</li>
              <li>Border: 1px solid #E2E8F0</li>
              <li>Padding: 0 16px</li>
              <li>Focus: Border color #2DD4BF</li>
            </ul>
          </section>
        </div>

        <div className="layout-row layout-row--status">
          <section className="panel badges-panel" aria-labelledby="badges-heading">
            <SectionHeading id="badges-heading" index="09" title="Badges / Tags" />
            <div className="badge-groups">
              <div><span className="badge-context">Video</span><Badge tone="video">Video</Badge></div>
              <div><span className="badge-context">Lesson</span><Badge tone="lesson">Lesson</Badge></div>
              <div><span className="badge-context">Popular</span><Badge tone="popular">Popular</Badge></div>
            </div>
          </section>

          <section className="panel status-panel" aria-labelledby="status-heading">
            <SectionHeading id="status-heading" index="10" title="Status / Indicators" />
            <ul className="status-row">
              {statusItems.map((item) => <li key={item.label}><StatusIcon icon={item.icon} /><span>{item.label}</span></li>)}
            </ul>
          </section>

          <section className="panel progress-panel" aria-labelledby="progress-heading">
            <SectionHeading id="progress-heading" index="11" title="Progress Bar" />
            <div className="progress-row">
              <progress value="35" max="100" aria-label="35 percent complete">35%</progress>
              <span><strong>35%</strong> complete</span>
            </div>
          </section>
        </div>

        <section className="panel cards-panel" aria-labelledby="cards-heading">
          <SectionHeading id="cards-heading" index="12" title="Cards" />
          <div className="card-label-row" aria-hidden="true">
            <span>Course Card</span><span>Lesson Card (Video)</span><span>Lesson Card (Lesson)</span><span>Resource Card</span>
          </div>
          <div className="card-gallery">
            <CourseCard />
            <VideoLessonCard />
            <LessonCard />
            <ResourceCard />
          </div>
        </section>

        <section className="panel navigation-panel" id="navigation" aria-labelledby="navigation-heading">
          <SectionHeading id="navigation-heading" index="13" title="Navigation" />
          <div className="navigation-sample">
            <nav className="primary-nav" aria-label="Primary navigation sample">
              <a href="#colors" className="nav-brand"><span className="brand-mark-wrap"><LearnitoMark /></span><span>Learnito</span></a>
              <ul>
                <li><a href="#cards" className="is-active" aria-current="page">Courses</a></li>
                <li><a href="#progress-heading">My Learning</a></li>
              </ul>
            </nav>
            <nav className="breadcrumbs" aria-label="Breadcrumb sample">
              <span className="nav-subtitle">Breadcrumbs</span>
              <ol>
                <li><a href="#cards">All Courses</a><Icon name="chevron" /></li>
                <li><a href="#cards">Next.js for Production</a><Icon name="chevron" /></li>
                <li aria-current="page">Data Fetching &amp; Caching</li>
              </ol>
            </nav>
            <nav className="pagination" aria-label="Pagination sample">
              <span className="nav-subtitle">Pagination</span>
              <ol>
                <li><a href="#cards" aria-label="Previous page"><Icon name="chevron" className="chevron--previous" /></a></li>
                <li><a href="#cards" className="is-active" aria-current="page">1</a></li>
                <li><a href="#cards">2</a></li>
                <li><a href="#cards">3</a></li>
                <li aria-hidden="true">…</li>
                <li><a href="#cards">8</a></li>
                <li><a href="#cards" aria-label="Next page"><Icon name="chevron" /></a></li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="panel principles-panel" aria-labelledby="principles-heading">
          <SectionHeading id="principles-heading" index="14" title="Principles" />
          <ul className="principles-grid">
            {principles.map((principle) => (
              <li key={principle.title}>
                <Icon name={principle.icon} className="principle-icon" />
                <div><h3>{principle.title}</h3><p>{principle.description}</p></div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
