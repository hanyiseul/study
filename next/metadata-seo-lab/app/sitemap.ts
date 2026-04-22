import type { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const postUrls = posts.map((post) => ({
    url: `https://example.com/posts/${post.id}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    ...postUrls
  ];
}