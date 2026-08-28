import 'server-only'

import {sanityFetch} from './client'
import {
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_CONTEXTS_FOR_LESSON_QUERY,
  COURSE_SLUGS_QUERY,
  COURSES_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  INSTRUCTORS_QUERY,
  LESSON_BY_SLUG_QUERY,
  LESSON_SLUGS_QUERY,
} from './queries'
import type {
  Category,
  CategoryWithCourses,
  Course,
  CourseCatalog,
  CourseModule,
  CourseContext,
  Instructor,
  InstructorWithCourses,
  Lesson,
  LessonWithContext,
  OrderedCourse,
  OrderedCourseContext,
  OrderedModule,
  SlugRecord,
} from './types'

function isPresent<T>(value: T | null | undefined): value is T {
  return value != null
}

function withDerivedModules(modules: CourseModule[] | null): OrderedModule[] {
  return (modules ?? []).filter(isPresent).map((module, moduleIndex) => ({
    ...module,
    moduleNumber: moduleIndex + 1,
    lessons: (module.lessons ?? [])
      .filter(isPresent)
      .map((lesson, lessonIndex) => ({
        ...lesson,
        lessonNumber: `${moduleIndex + 1}.${lessonIndex + 1}`,
      })),
  }))
}

function withDerivedOrder(value: Course): OrderedCourse {
  return {...value, modules: withDerivedModules(value.modules)}
}

function withDerivedContextOrder(value: CourseContext): OrderedCourseContext {
  return {...value, modules: withDerivedModules(value.modules)}
}

function uniqueMatch<T>(matches: T[]): T | null {
  return matches.length === 1 ? matches[0] : null
}

export async function getCourses(): Promise<CourseCatalog[]> {
  return sanityFetch(COURSES_QUERY, {}, {tags: ['course']})
}

export async function getCourseBySlug(
  slug: string,
): Promise<OrderedCourse | null> {
  const courses = await sanityFetch(COURSE_BY_SLUG_QUERY, {slug}, {
    tags: ['course', `course:${slug}`],
  })
  const course = uniqueMatch(courses)

  return course ? withDerivedOrder(course) : null
}

export async function getLessonBySlug(
  slug: string,
  courseSlug?: string,
): Promise<LessonWithContext | null> {
  const lessons = await sanityFetch(LESSON_BY_SLUG_QUERY, {slug}, {
    tags: ['lesson', `lesson:${slug}`],
  })
  const lesson = uniqueMatch(lessons)

  if (!lesson) {
    return null
  }

  const courses = await sanityFetch(
    COURSE_CONTEXTS_FOR_LESSON_QUERY,
    {lessonId: lesson._id},
    {tags: ['course', `lesson:${lesson._id}`]},
  )

  if (courseSlug) {
    const course = uniqueMatch(
      courses.filter((candidate) => candidate.slug === courseSlug),
    )

    if (!course) {
      return null
    }

    return buildLessonWithContext(lesson, course)
  }

  const course = courses.length === 1 ? courses[0] : null

  if (!course) {
    return buildLessonWithoutContext(lesson)
  }

  return buildLessonWithContext(lesson, course)
}

function buildLessonWithoutContext(
  lesson: Lesson,
): LessonWithContext {
  return {
    ...lesson,
    course: null,
    module: null,
    moduleNumber: null,
    lessonNumber: null,
  }
}

function buildLessonWithContext(
  lesson: Lesson,
  course: CourseContext,
): LessonWithContext {
  const orderedCourse = withDerivedContextOrder(course)
  const matchingModules = orderedCourse.modules.filter((candidate) =>
    candidate.lessons.some((candidateLesson) => candidateLesson._id === lesson._id),
  )
  const matchingLessons = matchingModules.flatMap((candidate) =>
    candidate.lessons.filter((candidateLesson) => candidateLesson._id === lesson._id),
  )
  const matchingModule =
    matchingModules.length === 1 && matchingLessons.length === 1
      ? matchingModules[0]
      : null
  const orderedLesson = matchingModule ? matchingLessons[0] : null

  return {
    ...lesson,
    course,
    module: matchingModule ?? null,
    moduleNumber: matchingModule?.moduleNumber ?? null,
    lessonNumber: orderedLesson?.lessonNumber ?? null,
  }
}

export async function getInstructors(): Promise<Instructor[]> {
  return sanityFetch(INSTRUCTORS_QUERY, {}, {tags: ['instructor']})
}

export async function getInstructorBySlug(
  slug: string,
): Promise<InstructorWithCourses | null> {
  const instructors = await sanityFetch(INSTRUCTOR_BY_SLUG_QUERY, {slug}, {
    tags: ['instructor', `instructor:${slug}`, 'course'],
  })
  return uniqueMatch(instructors)
}

export async function getCategories(): Promise<Category[]> {
  return sanityFetch(CATEGORIES_QUERY, {}, {tags: ['category']})
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryWithCourses | null> {
  const categories = await sanityFetch(CATEGORY_BY_SLUG_QUERY, {slug}, {
    tags: ['category', `category:${slug}`, 'course'],
  })
  return uniqueMatch(categories)
}

export async function getCourseSlugs(): Promise<SlugRecord[]> {
  const records = await sanityFetch(COURSE_SLUGS_QUERY, {}, {tags: ['course']})
  return uniqueSlugRecords(records)
}

export async function getLessonSlugs(): Promise<SlugRecord[]> {
  const records = await sanityFetch(LESSON_SLUGS_QUERY, {}, {tags: ['lesson']})
  return uniqueSlugRecords(records)
}

function uniqueSlugRecords(
  records: Array<{slug: string | null}>,
): SlugRecord[] {
  return [...new Set(records.flatMap(({slug}) => (slug ? [slug] : [])))].map(
    (slug) => ({slug}),
  )
}
