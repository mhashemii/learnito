import type {SlugIsUniqueValidator} from 'sanity'

import {apiVersion} from '../env'

export function isUniqueSlug(documentType: string): SlugIsUniqueValidator {
  return async (slug, context) => {
    const documentId = context.document?._id?.replace(/^drafts\./, '') ?? ''
    const draftId = documentId ? `drafts.${documentId}` : ''

    return context.getClient({apiVersion}).fetch<boolean>(
      `!defined(*[_type == $documentType && slug.current == $slug && !(_id in [$documentId, $draftId])][0]._id)`,
      {documentType, slug, documentId, draftId},
    )
  }
}
