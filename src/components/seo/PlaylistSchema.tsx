import React from 'react';
import { Playlist, VideoEntry } from '@/types';

interface PlaylistSchemaProps {
  playlist: Playlist;
  videos: VideoEntry[];
}

const PlaylistSchema = ({ playlist, videos }: PlaylistSchemaProps) => {
  // Create the JSON-LD schema for a YouTube playlist
  const playlistSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: playlist.title,
    description: playlist.description || `Collection of festive window projection videos: ${playlist.title}`,
    numberOfItems: videos.length,
    // Add the canonical URL of the playlist
    url: `https://festiveambience.com/playlists/${playlist.id}`,
    itemListElement: videos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnail,
        uploadDate: video.published.toISOString(),
        contentUrl: video.link,
        embedUrl: `https://www.youtube.com/embed/${video.id}`,
        duration: `PT${video.duration}S`,
        url: `https://festiveambience.com/videos/${video.id}`,
        interactionStatistic: {
          '@type': 'InteractionCounter',
          interactionType: { '@type': 'https://schema.org/WatchAction' },
          userInteractionCount: video.views,
        },
      }
    })),
    // Add the publisher (the organization)
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(playlistSchema) }}
    />
  );
};

export default PlaylistSchema;
