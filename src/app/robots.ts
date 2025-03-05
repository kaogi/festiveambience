import { MetadataRoute } from 'next';

// Configuration de robots.txt pour guider les moteurs de recherche
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://festiveambience.com/sitemap.xml',
  };
} 