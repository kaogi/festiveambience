import { MetadataRoute } from 'next';

// Cette configuration est nécessaire pour l'export statique
export const dynamic = "force-static";

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