import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://weatherApp.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
  ];
}
