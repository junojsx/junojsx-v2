export interface Project {
  id: string
  name: string
  description: string
  techTags: string[]
  liveUrl: string
  repoUrl: string
}

export interface TechItem {
  name: string
  iconUrl: string
  category: 'language' | 'framework' | 'tool' | 'platform'
}

export interface NavLink {
  label: string
  href: string
}

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  summary: string
  tags: string[]
  readMinutes: number
  body?: import('@portabletext/types').PortableTextBlock[]
}
