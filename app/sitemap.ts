import { MetadataRoute } from 'next';
import { allPosts } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `https://t31k.com${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: 'https://t31k.com', lastModified: new Date(), priority: 1 },
    { url: 'https://t31k.com/about', lastModified: new Date(), priority: 0.9 },
    { url: 'https://t31k.com/wallpapers', priority: 0.5 },
    { url: 'https://t31k.com/ran', priority: 0.5 },
    ...posts,
  ];
}
