import type {
  CATEGORIES_QUERY_RESULT,
  CATEGORY_BY_SLUG_QUERY_RESULT,
  COURSE_BY_SLUG_QUERY_RESULT,
  COURSE_CONTEXTS_FOR_LESSON_QUERY_RESULT,
  COURSES_QUERY_RESULT,
  INSTRUCTOR_BY_SLUG_QUERY_RESULT,
  INSTRUCTORS_QUERY_RESULT,
  LESSON_BY_SLUG_QUERY_RESULT,
} from '../../sanity.types'

export type SanityReference = {
  _ref: string
  _type: 'reference'
}

export type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>
export type CourseCatalog = COURSES_QUERY_RESULT[number]
export type CourseModule = NonNullable<NonNullable<Course['modules']>[number]>
export type LessonSummary = NonNullable<NonNullable<CourseModule['lessons']>[number]>
export type SanityImage = NonNullable<Course['coverImage']>
export type InstructorSummary = NonNullable<Course['instructor']>
export type CategorySummary = NonNullable<Course['category']>
export type LearningOutcome = NonNullable<
  NonNullable<Course['learningOutcomes']>[number]
>

export type OrderedModule = Omit<CourseModule, 'lessons'> & {
  moduleNumber: number
  lessons: Array<LessonSummary & {lessonNumber: string}>
}

export type OrderedCourse = Omit<Course, 'modules'> & {
  modules: OrderedModule[]
}

export type Lesson = NonNullable<LESSON_BY_SLUG_QUERY_RESULT>

export type CourseContext = NonNullable<
  COURSE_CONTEXTS_FOR_LESSON_QUERY_RESULT[number]
>

export type LessonWithContext = Lesson & {
  course: CourseContext | null
  module: OrderedModule | null
  moduleNumber: number | null
  lessonNumber: string | null
}

export type Instructor = INSTRUCTORS_QUERY_RESULT[number]
export type InstructorWithCourses = NonNullable<INSTRUCTOR_BY_SLUG_QUERY_RESULT>
export type Category = CATEGORIES_QUERY_RESULT[number]
export type CategoryWithCourses = NonNullable<CATEGORY_BY_SLUG_QUERY_RESULT>
export type SlugRecord = {slug: string}
