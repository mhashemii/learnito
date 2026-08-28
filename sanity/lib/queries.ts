import {defineQuery} from 'next-sanity'

export const COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage{..., alt},
    level,
    price,
    "isPopular": coalesce(isPopular, false),
    "studentCount": coalesce(studentCount, 0),
    learningOutcomes[]{_key, icon, title, description},
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo{..., alt},
      expertise,
      bio
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        videoUrl,
        poster{..., alt},
        duration,
        "isFreePreview": coalesce(isFreePreview, false),
        "studentCount": coalesce(studentCount, 0)
      }
    }
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage{..., alt},
    level,
    price,
    "isPopular": coalesce(isPopular, false),
    "studentCount": coalesce(studentCount, 0),
    learningOutcomes[]{_key, icon, title, description},
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo{..., alt},
      expertise,
      bio
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        videoUrl,
        poster{..., alt},
        duration,
        "isFreePreview": coalesce(isFreePreview, false),
        "studentCount": coalesce(studentCount, 0)
      }
    }
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster{..., alt},
    duration,
    "isFreePreview": coalesce(isFreePreview, false),
    "studentCount": coalesce(studentCount, 0),
    notes,
    keyPoints,
    proTip,
    resources[]{_key, type, title, description, url}
  }
`)

export const COURSE_CONTEXT_FOR_LESSON_QUERY = defineQuery(`
  *[_type == "course" && references($lessonId)][0] {
    _id,
    title,
    "slug": slug.current,
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo{..., alt},
      expertise,
      bio
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        videoUrl,
        poster{..., alt},
        duration,
        "isFreePreview": coalesce(isFreePreview, false),
        "studentCount": coalesce(studentCount, 0)
      }
    }
  }
`)

export const INSTRUCTORS_QUERY = defineQuery(`
  *[_type == "instructor" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    photo{..., alt},
    expertise,
    bio
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo{..., alt},
    expertise,
    bio,
    "courses": *[_type == "course" && instructor._ref == ^._id] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage{..., alt},
      level,
      price,
      "isPopular": coalesce(isPopular, false),
      "studentCount": coalesce(studentCount, 0),
      category->{_id, title, "slug": slug.current, description}
    }
  }
`)

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "courses": *[_type == "course" && category._ref == ^._id] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage{..., alt},
      level,
      price,
      "isPopular": coalesce(isPopular, false),
      "studentCount": coalesce(studentCount, 0),
      instructor->{_id, name, "slug": slug.current, photo{..., alt}, expertise, bio}
    }
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current
  }
`)

export const LESSON_SLUGS_QUERY = defineQuery(`
  *[_type == "lesson" && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current
  }
`)
