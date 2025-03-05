import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Festive Window Projections - Magical Holiday Window Displays',
  description: 'Discover magical window projections for Christmas, Halloween, Easter and more. Transform your home with our festive projection videos.',
  keywords: 'window projections, digital decorations, Christmas projections, Halloween projections, festive ambience, festive videos',
  
  openGraph: {
    title: 'Festive Window Projections - Transform Your Home',
    description: 'Discover magical window projections for all holidays and occasions. Create a unique festive ambience with our projection videos.',
    url: 'https://festiveambience.com',
    siteName: 'Festive Window Projections',
    images: [
      {
        url: 'https://festiveambience.com/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Festive Window Projections',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Festive Window Projections - Magical Displays',
    description: 'Discover festive projections for all special occasions and transform your home with our projection videos.',
    images: ['https://festiveambience.com/og-home.jpg'],
  },
  
  alternates: {
    canonical: 'https://festiveambience.com',
  },
}; 