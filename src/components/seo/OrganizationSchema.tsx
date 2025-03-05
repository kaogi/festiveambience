import React from 'react';

const OrganizationSchema = () => {
  // Create JSON-LD schema for the organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Festive Ambience',
    description: 'Creator of festive window projections and digital decorations for all seasons and occasions.',
    url: 'https://festiveambience.com',
    logo: 'https://festiveambience.com/logo.png',
    sameAs: [
      'https://www.youtube.com/channel/UC50vfiAGflBnDv6PD1NNTrw',
      // Add other social media links if available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@festiveambience.com'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
};

export default OrganizationSchema; 