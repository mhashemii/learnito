import 'server-only'

import {createClient, type ClientReturn, type QueryParams} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

const readToken = process.env.SANITY_API_READ_TOKEN?.trim()

if (!readToken) {
  throw new Error('Missing environment variable: SANITY_API_READ_TOKEN')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  token: readToken,
  useCdn: false,
})

export type SanityFetchOptions = {
  revalidate?: number | false
  tags?: string[]
}

export async function sanityFetch<const TQuery extends string>(
  query: TQuery,
  params: QueryParams = {},
  {revalidate = 60, tags = []}: SanityFetchOptions = {},
): Promise<ClientReturn<TQuery>> {
  const requestOptions = {
    perspective: 'published' as const,
    stega: false as const,
    ...(revalidate === false
      ? {cache: 'no-store' as const}
      : {next: {revalidate, tags}}),
  }

  return client.fetch(query, params, requestOptions)
}
