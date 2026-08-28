import type {PortableTextBlock} from '@portabletext/types'

export type SanityReference = {
  _ref: string
  _type: 'reference'
}

export type SanityImage = {
  _type: 'image'
  _key?: string
  asset?: SanityReference
  alt?: string
  crop?: {
    bottom?: number
    left?: number
    right?: number
    top?: number
  }
  hotspot?: {
    height?: number
    width?: number
    x?: number
    y?: number
  }
}

export type InstructorSummary = {
  _id: string
  name: string
  slug: string
  photo?: SanityImage
  expertise: string
  bio: string
}

export type CategorySummary = {
  _id: string
  title: string
  slug: string
  description: string
}

export type LearningOutcome = {
  _key: string
  icon: string
  title: string
  description: string
}

export type LessonSummary = {
  _id: string
  title: string
  slug: string
  videoUrl: string
  poster?: SanityImage
  duration: number
  isFreePreview: boolean
  studentCount: number
}

export type CourseModule = {
  _key: string
  title: string
  summary: string
  lessons: LessonSummary[]
}

export type Course = {
  _id: string
  title: string
  slug: string
  summary: string
  coverImage: SanityImage
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  isPopular: boolean
  studentCount: number
  learningOutcomes: LearningOutcome[]
  instructor: InstructorSummary | null
  category: CategorySummary | null
  modules: CourseModule[]
}

export type OrderedModule = Omit<CourseModule, 'lessons'> & {
  moduleNumber: number
  lessons: Array<LessonSummary & {lessonNumber: string}>
}

export type OrderedCourse = Omit<Course, 'modules'> & {
  modules: OrderedModule[]
}

export type Lesson = LessonSummary & {
  notes: PortableTextBlock[]
  keyPoints: string[]
  proTip?: string
  resources: Array<{
    _key: string
    type: 'article' | 'video' | 'download' | 'link'
    title: string
    description: string
    url: string
  }>
}

export type CourseContext = Pick<
  Course,
  '_id' | 'title' | 'slug' | 'instructor' | 'category'
> & {
  modules: CourseModule[]
}

export type LessonWithContext = Lesson & {
  course: CourseContext | null
  module: OrderedModule | null
  moduleNumber: number | null
  lessonNumber: string | null
}

export type Instructor = InstructorSummary

export type InstructorWithCourses = Instructor & {
  courses: Array<Pick<Course, '_id' | 'title' | 'slug' | 'summary' | 'coverImage' | 'level' | 'price' | 'isPopular' | 'studentCount' | 'category'>>
}

export type Category = CategorySummary

export type CategoryWithCourses = Category & {
  courses: Array<Pick<Course, '_id' | 'title' | 'slug' | 'summary' | 'coverImage' | 'level' | 'price' | 'isPopular' | 'studentCount' | 'instructor'>>
}

export type SlugRecord = {slug: string}
