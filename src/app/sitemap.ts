import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = 86400
import { products } from '@/data/products'
import { teamMembers } from '@/data/team'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tomorebeyond.co'
  const now = new Date()

  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ]

  products.forEach(p => {
    urls.push({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  teamMembers.forEach(m => {
    urls.push({
      url: `${baseUrl}/team/${m.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return urls
}
