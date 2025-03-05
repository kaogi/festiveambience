import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Festive Window Videos | Best Holiday Projections',
  description: 'Browse our collection of high-quality window projection videos for all holidays. Perfect for Christmas, Halloween, Easter, and any festive occasion.',
  keywords: 'festive videos, window projection videos, holiday projections, Christmas videos, Halloween projections',
  alternates: {
    canonical: 'https://festiveambience.com/videos',
  },
  openGraph: {
    title: 'Festive Window Videos | Premium Holiday Projections',
    description: 'Browse our extensive collection of stunning window projection videos for all holidays and seasons.',
    url: 'https://festiveambience.com/videos',
    type: 'website',
    images: [
      {
        url: 'https://festiveambience.com/og-videos.jpg',
        width: 1200,
        height: 630,
        alt: 'Festive Window Videos Collection',
      },
    ],
    siteName: 'Festive Ambience',
  },
};

export default metadata; 