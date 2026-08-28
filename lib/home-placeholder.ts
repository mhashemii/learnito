// PLACEHOLDER: replace this module with the course catalog data integration task.

export type HomeCourse = {
  slug: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate";
  duration: string;
  modules: string;
  logo: "next" | "docker" | "typescript";
};

export const homeCourses: HomeCourse[] = [
  {
    slug: "next-js-for-production",
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
    logo: "next",
  },
  {
    slug: "docker-essentials",
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
    logo: "docker",
  },
  {
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
    logo: "typescript",
  },
];
