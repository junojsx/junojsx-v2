import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'n5l953ie',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
