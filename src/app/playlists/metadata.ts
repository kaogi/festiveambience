import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Holiday Projection Playlists | Festive Window Collections',
  description: 'Discover our curated playlists of stunning window projections for Christmas, Halloween, Easter, Valentine\'s and other holidays.',
  keywords: 'festive playlists, window projection collections, holiday playlists, themed projections, seasonal displays',
  alternates: {
    canonical: 'https://festiveambience.com/playlists',
  },
  openGraph: {
    title: 'Holiday Projection Playlists | Festive Collections',
    description: 'Explore our themed collections of window projections for all seasons and holidays.',
    url: 'https://festiveambience.com/playlists',
    type: 'website',
    images: [
      {
        url: 'https://festiveambience.com/og-playlists.jpg',
        width: 1200,
        height: 630,
        alt: 'Festive Window Projection Playlists',
      },
    ],
    siteName: 'Festive Ambience',
  },
};

export default metadata; 