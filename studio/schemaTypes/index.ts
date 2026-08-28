import type {SchemaTypeDefinition} from 'sanity'

import {category} from './category'
import {course} from './course'
import {instructor} from './instructor'
import {lesson} from './lesson'
import {learningOutcome} from './objects/learningOutcome'
import {courseModule} from './objects/module'
import {resource} from './objects/resource'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    course,
    lesson,
    instructor,
    category,
    courseModule,
    learningOutcome,
    resource,
  ],
}
