import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/standalone/',
    },
    sitemap: 'https://weatherapp.vercel.app/sitemap.xml',
  };
}
