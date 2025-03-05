import React from 'react';
import { VideoEntry } from '@/types';

interface VideoSchemaProps {
  video: VideoEntry;
}

const VideoSchema = ({ video }: VideoSchemaProps) => {
  // Create JSON-LD schema for a YouTube video
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.published.toISOString(),
    contentUrl: video.link,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    duration: `PT${video.duration}S`,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'https://schema.org/WatchAction' },
      userInteractionCount: video.views,
    },
    // Add canonical URL with domain
    url: `https://festiveambience.com/videos/${video.id}`,
    // Add publisher information
    publisher: {
      '@type': 'Organization',
      name: 'Festive Ambience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://festiveambience.com/logo.png'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
    />
  );
};

export default VideoSchema; 