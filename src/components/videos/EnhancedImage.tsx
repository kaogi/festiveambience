import React from 'react';
import Image, { ImageProps } from 'next/image';

interface EnhancedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  keywords?: string[];
  contextDescription?: string;
}

/**
 * Composant Image amélioré avec une meilleure description alt pour le SEO
 * Combine les mots-clés et la description contextuelle pour créer une balise alt plus descriptive
 */
const EnhancedImage = ({
  alt,
  keywords = [],
  contextDescription = '',
  ...props
}: EnhancedImageProps) => {
  // Création d'une balise alt enrichie pour le SEO
  const enhancedAlt = `${alt}${contextDescription ? ` - ${contextDescription}` : ''}${
    keywords.length > 0 ? ` | ${keywords.join(', ')}` : ''
  }`;

  return <Image alt={enhancedAlt} {...props} />;
};

export default EnhancedImage; 