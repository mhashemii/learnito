import { homeCourses, type HomeCourse } from "@/lib/home-placeholder";
import { Icon, LearnitoMark } from "@/components/icons";

function CourseLogo({ kind }: { kind: HomeCourse["logo"] }) {
  if (kind === "next") {
    return <span className="home-course-logo home-course-logo--next" aria-hidden="true">N</span>;
  }

  if (kind === "typescript") {
    return <span className="home-course-logo home-course-logo--typescript" aria-hidden="true">TS</span>;
  }

  return (
    <span className="home-course-logo home-course-logo--docker" aria-hidden="true">
      <svg viewBox="0 0 80 64" focusable="false">
        <path d="M7 34h52c-1.5 10.9-10.4 19.1-25.8 20C18.2 54.8 9.5 48.6 7 34Z" fill="currentColor" />
        <path d="M15 32V20h9v12m2 0V14h9v18m2 0V18h9v14m2 0V23h9v9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path d="M58.5 29.5c4.7-5.2 10.2-5.4 14.5-1.7-2.2 3.8-5.7 5.2-10.4 4.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <circle cx="22" cy="40" r="1.6" fill="var(--color-surface)" />
      </svg>
    </span>
  );
}

function HomeCourseCard({ course }: { course: HomeCourse }) {
  return (
    <li>
      <article className="home-course-card">
        <a className="home-course-card__link" href={`/courses/${course.slug}`}>
          <CourseLogo kind={course.logo} />
          <div className="home-course-card__body">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
          <ul className="home-course-card__meta" aria-label={`${course.title} details`}>
            <li><Icon name="chart" /><span>{course.level}</span></li>
            <li><Icon name="clock" /><span>{course.duration}</span></li>
            <li><Icon name="folder" /><span>{course.modules}</span></li>
          </ul>
        </a>
      </article>
    </li>
  );
}

const activityBars = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "spacer-one",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "spacer-two",
  "twelve",
  "thirteen",
  "fourteen",
] as const;

export function HomePage() {
  return (
    <div className="home-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="home-frame">
        <header className="home-header">
          <div className="home-header__left">
            <a className="home-brand" href="#main-content" aria-label="Learnito home">
              <span className="home-brand__mark"><LearnitoMark /></span>
              <span>Learnito</span>
            </a>
            <nav className="home-nav" aria-label="Primary navigation">
              <a href="#courses">Courses</a>
              <a href="/learning">My Learning</a>
            </nav>
          </div>
          <div className="home-header__actions">
            <button className="home-icon-button" type="button" aria-label="Open notifications">
              <Icon name="bell" />
            </button>
            <a className="home-avatar-link" href="/profile" aria-label="Open profile">
              <span className="home-avatar" aria-hidden="true">
                <span className="home-avatar__hair" />
                <span className="home-avatar__face" />
                <span className="home-avatar__shirt" />
              </span>
            </a>
          </div>
        </header>

        <main id="main-content">
          <section className="home-hero" aria-labelledby="home-title">
            <div className="home-hero__content">
              <p className="home-eyebrow">Intelligent learning</p>
              <h1 id="home-title">
                Search your learning
                <br className="home-hero__break" />
                in plain English.
              </h1>
              <p className="home-hero__lede">Learnito understands what you want to learn and finds the exact lessons across all your courses.</p>
              <a className="home-hero__cta" href="#courses">
                <span>Explore Courses</span>
                <Icon name="arrow-right" />
              </a>
              <form className="home-search" action="/search" method="get" role="search">
                <label className="home-visually-hidden" htmlFor="home-search-input">Search anything about your learning</label>
                <Icon name="search" />
                <input id="home-search-input" name="q" type="search" placeholder="Ask anything about your learning..." />
                <kbd aria-label="Command K">⌘ K</kbd>
              </form>
            </div>
          </section>

          <section className="home-courses" id="courses" aria-labelledby="courses-title">
            <div className="home-section-heading">
              <h2 id="courses-title">All Courses</h2>
              <a className="home-section-link" href="#courses">
                <span>View all courses</span>
                <Icon name="arrow-right" />
              </a>
            </div>
            {homeCourses.length > 0 ? (
              <ul className="home-course-grid">
                {homeCourses.map((course) => <HomeCourseCard key={course.slug} course={course} />)}
              </ul>
            ) : (
              <p className="home-empty-state">New courses are on the way. Check back soon.</p>
            )}
          </section>

          <section className="home-announcement" aria-label="Learnito updates">
            <span className="home-announcement__rule" aria-hidden="true" />
            <p><Icon name="star" /> <span>New courses and lessons added every week.</span></p>
            <span className="home-announcement__rule" aria-hidden="true" />
          </section>

          <div className="home-activity" aria-hidden="true">
            <div className="home-activity__bars">
              {activityBars.map((bar) => <span className={`home-activity__bar home-activity__bar--${bar}`} key={bar} />)}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
