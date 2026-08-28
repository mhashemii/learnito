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
  CourseCatalog,
  CourseModule,
  Instructor,
  InstructorWithCourses,
  LessonWithContext,
  OrderedCourse,
  OrderedModule,
  SlugRecord,
} from './types'

type WithDerivedModules<T extends {modules: CourseModule[] | null}> = Omit<
  T,
  'modules'
> & {
  modules: OrderedModule[]
}

function withDerivedOrder<T extends {modules: CourseModule[] | null}>(
  value: T,
): WithDerivedModules<T> {
  return {
    ...value,
    modules: (value.modules ?? []).filter(Boolean).map((module, moduleIndex) => ({
      ...module,
      moduleNumber: moduleIndex + 1,
      lessons: (module.lessons ?? [])
        .filter(Boolean)
        .map((lesson, lessonIndex) => ({
          ...lesson,
          lessonNumber: `${moduleIndex + 1}.${lessonIndex + 1}`,
        })),
    })),
  } as WithDerivedModules<T>
}

export async function getCourses(): Promise<CourseCatalog[]> {
  return sanityFetch(COURSES_QUERY, {}, {tags: ['course']})
}

export async function getCourseBySlug(
  slug: string,
): Promise<OrderedCourse | null> {
  const course = await sanityFetch(COURSE_BY_SLUG_QUERY, {slug}, {
    tags: ['course', `course:${slug}`],
  })

  return course ? withDerivedOrder(course) : null
}

export async function getLessonBySlug(
  slug: string,
  courseSlug?: string,
): Promise<LessonWithContext | null> {
  const lesson = await sanityFetch(LESSON_BY_SLUG_QUERY, {slug}, {
    tags: ['lesson', `lesson:${slug}`],
  })

  if (!lesson) {
    return null
  }

  const courses = await sanityFetch(COURSE_CONTEXTS_FOR_LESSON_QUERY,
    {lessonId: lesson._id},
    {tags: ['course', `lesson:${lesson._id}`]},
  )

  const course = courseSlug
    ? courses.find((candidate) => candidate.slug === courseSlug) ?? null
    : courses.length === 1
      ? courses[0]
      : null

  if (!course) {
    return {
      ...lesson,
      course: null,
      module: null,
      moduleNumber: null,
      lessonNumber: null,
    }
  }

  const orderedCourse = withDerivedOrder(course)
  const matchingModule = orderedCourse.modules.find((candidate) =>
    candidate.lessons.some((candidateLesson) => candidateLesson._id === lesson._id),
  )
  const orderedLesson = matchingModule?.lessons.find(
    (candidateLesson) => candidateLesson._id === lesson._id,
  )

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
  return sanityFetch(INSTRUCTOR_BY_SLUG_QUERY, {slug}, {
    tags: ['instructor', `instructor:${slug}`, 'course'],
  })
}

export async function getCategories(): Promise<Category[]> {
  return sanityFetch(CATEGORIES_QUERY, {}, {tags: ['category']})
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryWithCourses | null> {
  return sanityFetch(CATEGORY_BY_SLUG_QUERY, {slug}, {
    tags: ['category', `category:${slug}`, 'course'],
  })
}

export async function getCourseSlugs(): Promise<SlugRecord[]> {
  const records = await sanityFetch(COURSE_SLUGS_QUERY, {}, {tags: ['course']})
  return records.flatMap(({slug}) => (slug ? [{slug}] : []))
}

export async function getLessonSlugs(): Promise<SlugRecord[]> {
  const records = await sanityFetch(LESSON_SLUGS_QUERY, {}, {tags: ['lesson']})
  return records.flatMap(({slug}) => (slug ? [{slug}] : []))
}
